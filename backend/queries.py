"""
All SQL used by the API lives here, in one place, so the FastAPI route
functions in main.py stay short and readable.

These are the exact same queries that were validated in MySQL Workbench
during the project build — just parameterised/cleaned slightly for reuse.
"""

# ---------------------------------------------------------------------------
# 1. Top-level KPIs shown in the header strip
# ---------------------------------------------------------------------------
OVERVIEW_SQL = """
SELECT
    (SELECT COUNT(DISTINCT customer_unique_id) FROM customers) AS total_customers,

    (SELECT ROUND(SUM(op.payment_value), 2)
       FROM orders o
       JOIN order_payments op ON o.order_id = op.order_id
      WHERE o.order_status = 'delivered') AS total_revenue,

    (SELECT ROUND(AVG(order_total), 2) FROM (
        SELECT o.order_id, SUM(op.payment_value) AS order_total
        FROM orders o
        JOIN order_payments op ON o.order_id = op.order_id
        WHERE o.order_status = 'delivered'
        GROUP BY o.order_id
     ) t) AS avg_order_value,

    (SELECT ROUND(SUM(op.payment_value), 2)
       FROM orders o
       JOIN order_payments op ON o.order_id = op.order_id
      WHERE o.order_status IN ('canceled', 'unavailable')) AS lost_revenue
"""

# ---------------------------------------------------------------------------
# 2. RFM segment distribution
# ---------------------------------------------------------------------------
RFM_SQL = """
WITH customer_orders AS (
    SELECT
        c.customer_unique_id,
        o.order_id,
        o.order_purchase_timestamp,
        op.total_payment
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN (
        SELECT order_id, SUM(payment_value) AS total_payment
        FROM order_payments
        GROUP BY order_id
    ) op ON o.order_id = op.order_id
    WHERE o.order_status = 'delivered'
),
rfm_base AS (
    SELECT
        customer_unique_id,
        COUNT(DISTINCT order_id) AS frequency,
        SUM(total_payment) AS monetary,
        DATEDIFF(
            (SELECT MAX(order_purchase_timestamp) FROM customer_orders),
            MAX(order_purchase_timestamp)
        ) AS recency_days
    FROM customer_orders
    GROUP BY customer_unique_id
),
rfm_scored AS (
    SELECT
        customer_unique_id,
        recency_days,
        frequency,
        monetary,
        NTILE(5) OVER (ORDER BY recency_days DESC) AS r_score,
        NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary ASC) AS m_score
    FROM rfm_base
),
rfm_final AS (
    SELECT
        *,
        CASE
            WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
            WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customers'
            WHEN r_score >= 4 AND f_score <= 2 THEN 'New Customers'
            WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk'
            WHEN r_score <= 2 AND f_score <= 2 AND m_score <= 2 THEN 'Lost'
            ELSE 'Need Attention'
        END AS customer_segment
    FROM rfm_scored
)
SELECT
    customer_segment,
    COUNT(*) AS num_customers,
    ROUND(SUM(monetary), 2) AS total_revenue,
    ROUND(AVG(monetary), 2) AS avg_revenue_per_customer,
    ROUND(SUM(monetary) * 100.0 / (SELECT SUM(monetary) FROM rfm_final), 2) AS revenue_percentage
FROM rfm_final
GROUP BY customer_segment
ORDER BY total_revenue DESC
"""

# ---------------------------------------------------------------------------
# 3. Repeat-purchase breakdown (one-time buyer vs repeat buyer)
# ---------------------------------------------------------------------------
COHORT_SQL = """
WITH customer_orders AS (
    SELECT
        c.customer_unique_id,
        o.order_id
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.order_status = 'delivered'
),
order_counts AS (
    SELECT
        customer_unique_id,
        COUNT(DISTINCT order_id) AS total_orders
    FROM customer_orders
    GROUP BY customer_unique_id
)
SELECT
    CASE
        WHEN total_orders = 1 THEN 'One-Time Buyer'
        WHEN total_orders = 2 THEN '2 Orders'
        WHEN total_orders BETWEEN 3 AND 5 THEN '3-5 Orders'
        ELSE '6+ Orders'
    END AS customer_type,
    COUNT(*) AS num_customers,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM order_counts), 2) AS percentage
FROM order_counts
GROUP BY customer_type
ORDER BY num_customers DESC
"""

# ---------------------------------------------------------------------------
# 4. Product affinity — top cross-category pairs bought together
# ---------------------------------------------------------------------------
AFFINITY_SQL = """
WITH product_pairs AS (
    SELECT
        a.product_id AS product_1,
        b.product_id AS product_2
    FROM order_items a
    JOIN order_items b
        ON a.order_id = b.order_id
        AND a.product_id < b.product_id
)
SELECT
    p1.product_category_name AS category_1,
    p2.product_category_name AS category_2,
    COUNT(*) AS times_bought_together
FROM product_pairs pp
JOIN products p1 ON pp.product_1 = p1.product_id
JOIN products p2 ON pp.product_2 = p2.product_id
WHERE p1.product_category_name IS NOT NULL
    AND p2.product_category_name IS NOT NULL
    AND p1.product_category_name != p2.product_category_name
GROUP BY p1.product_category_name, p2.product_category_name
ORDER BY times_bought_together DESC
LIMIT 8
"""

# ---------------------------------------------------------------------------
# 5. Revenue leakage — by order status
# ---------------------------------------------------------------------------
LEAKAGE_STATUS_SQL = """
SELECT
    o.order_status,
    COUNT(DISTINCT o.order_id) AS num_orders,
    ROUND(SUM(op.payment_value), 2) AS lost_revenue
FROM orders o
JOIN order_payments op ON o.order_id = op.order_id
WHERE o.order_status IN ('canceled', 'unavailable')
GROUP BY o.order_status
"""

# ---------------------------------------------------------------------------
# 6. Revenue leakage — by product category (canceled orders only)
# ---------------------------------------------------------------------------
LEAKAGE_CATEGORY_SQL = """
SELECT
    p.product_category_name,
    COUNT(DISTINCT o.order_id) AS canceled_orders,
    ROUND(SUM(oi.price), 2) AS lost_revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_status = 'canceled'
    AND p.product_category_name IS NOT NULL
GROUP BY p.product_category_name
ORDER BY lost_revenue DESC
LIMIT 8
"""
