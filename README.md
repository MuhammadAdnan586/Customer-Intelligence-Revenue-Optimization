<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0a0a2e,50:1a1a5e,100:2d2d8e&height=180&section=header&text=Customer%20Intelligence%20%26%20Revenue%20Optimization&fontSize=32&fontColor=ffffff&fontAlignY=38&desc=Segment%20%E2%86%92%20Retain%20%E2%86%92%20Recommend%20%E2%86%92%20Recover%20%E2%80%94%20SQL-Driven%20Analytics%20Dashboard&descAlignY=58&descSize=15&descColor=a8b4f8)

[![View Project](https://img.shields.io/badge/📊%20Stack-FastAPI%20+%20Next.js-0a0a2e?style=for-the-badge&logoColor=white)](#%EF%B8%8F-quick-start)
[![License](https://img.shields.io/badge/License-MIT-1a1a5e?style=for-the-badge)](#-license)
[![Stars](https://img.shields.io/github/stars/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization?style=for-the-badge&color=2d2d8e&label=Stars)](https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization?style=for-the-badge&color=2d2d8e&label=Updated)](https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization/commits/main)

</div>

---

### 📌 About the Project

**Customer Intelligence & Revenue Optimization** is a full-stack SQL-driven analytics dashboard built on the **Olist Brazilian E-Commerce dataset**. It answers four critical business questions — RFM customer segmentation, cohort retention analysis, product affinity mapping, and revenue leakage detection — using optimized MySQL queries served via FastAPI and visualized in Next.js with Recharts.

> Understanding customer behavior and revenue patterns traditionally requires data science teams, expensive BI tools, and weeks of analysis. This platform delivers those exact insights — from raw e-commerce data to interactive business dashboards — in a single deployable application.

---

### ✨ Key Features

**🔹 Core Analytics Engine**
- **RFM Segmentation** — classify customers by Recency, Frequency, and Monetary value
- **Cohort Retention Analysis** — track customer retention across monthly cohorts
- **Product Affinity Analysis** — discover which products are frequently bought together
- **Revenue Leakage Detection** — identify cancelled orders, refunds, and lost revenue patterns

**🔹 Data Intelligence Layer**
- **MySQL Query Engine** — complex analytical queries optimized for large datasets
- **Olist Dataset Integration** — 100K+ real Brazilian e-commerce orders across 9 tables
- **Interactive Charts** — dynamic Recharts visualizations (bar, line, heatmap, scatter)
- **KPI Dashboard** — real-time business metrics at a glance
- **Drill-Down Filters** — filter by date range, product category, customer segment

**🔹 Production & Web Features**
- **Full-Stack Web App** — Next.js frontend with FastAPI/Python backend
- **REST API** — all analytics accessible as clean JSON endpoints
- **Responsive UI** — Tailwind CSS, works on desktop and mobile
- **Fast API Docs** — auto-generated Swagger UI at `/docs`
- **Modular Architecture** — backend and frontend cleanly separated

---

### 🖼️ Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <b>📊 Main Dashboard</b><br/><br/>
      <img src="WhatsApp%20Image%202026-06-25%20at%204.11.26%20PM.jpeg" width="400" alt="Dashboard"/>
    </td>
    <td align="center" width="50%">
      <b>👥 RFM Customer Segmentation</b><br/><br/>
      <img src="WhatsApp%20Image%202026-06-25%20at%204.11.27%20PM.jpeg" width="400" alt="RFM Segmentation"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>🔁 Cohort Retention Analysis</b><br/><br/>
      <img src="WhatsApp%20Image%202026-06-25%20at%204.11.27%20PM%20(1).jpeg" width="400" alt="Cohort Retention"/>
    </td>
    <td align="center" width="50%">
      <b>🛒 Product Affinity Map</b><br/><br/>
      <img src="WhatsApp%20Image%202026-06-25%20at%204.11.27%20PM%20(2).jpeg" width="400" alt="Product Affinity"/>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <b>💸 Revenue Leakage Detection</b><br/><br/>
      <img src="WhatsApp%20Image%202026-06-25%20at%204.11.28%20PM.jpeg" width="400" alt="Revenue Leakage"/>
    </td>
  </tr>
</table>

---

### 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square&logoColor=white)

| Layer | Technology |
|---|---|
| Backend | FastAPI (Python) |
| Frontend | Next.js + JavaScript |
| Database | MySQL 8.0 |
| Charts & Visualization | Recharts |
| Styling | Tailwind CSS |
| Dataset | Olist Brazilian E-Commerce (Kaggle) |
| API Docs | Swagger UI (auto-generated) |

---

### ⚙️ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization.git
cd Customer-Intelligence-Revenue-Optimization
```

> 📄 For full local setup instructions, see **[RUN_LOCALLY.md](./RUN_LOCALLY.md)**

| Service | URL |
|---|---|
| Frontend App | http://localhost:3000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| RFM API | http://localhost:8000/api/rfm |
| Cohort API | http://localhost:8000/api/cohort |

---

### 📂 Project Structure

```
Customer-Intelligence-Revenue-Optimization/
├── backend/
│   ├── routes/
│   │   ├── rfm.py               # RFM segmentation endpoint
│   │   ├── cohort.py            # Cohort retention endpoint
│   │   ├── affinity.py          # Product affinity endpoint
│   │   └── leakage.py           # Revenue leakage endpoint
│   ├── db.py                    # MySQL connection
│   └── main.py                  # FastAPI entry point
├── frontend/
│   ├── components/              # Reusable React components
│   ├── pages/                   # Next.js pages
│   │   ├── index.js             # Dashboard home
│   │   ├── rfm.js               # RFM page
│   │   ├── cohort.js            # Cohort page
│   │   ├── affinity.js          # Affinity page
│   │   └── leakage.js           # Revenue leakage page
│   └── styles/                  # CSS / Tailwind config
├── RUN_LOCALLY.md
├── .gitignore
└── README.md
```

---

### 📊 Business Questions Answered

| # | Business Question | Analysis Type |
|---|---|---|
| 1 | Who are our most valuable customers? | RFM Segmentation |
| 2 | Are we retaining customers month over month? | Cohort Retention |
| 3 | Which products are frequently bought together? | Product Affinity |
| 4 | Where are we losing revenue? | Revenue Leakage Detection |

---

### 🔌 API Endpoints

```bash
GET  /api/rfm              # RFM scores and customer segments
GET  /api/cohort           # Monthly cohort retention matrix
GET  /api/affinity         # Product pair affinity scores
GET  /api/leakage          # Revenue leakage breakdown
GET  /api/kpis             # High-level KPI summary
```

**Example Response — RFM:**
```json
{
  "segment": "Champions",
  "customer_count": 1243,
  "avg_recency_days": 12,
  "avg_frequency": 4.7,
  "avg_monetary": 489.30
}
```

---

### 🗃️ Dataset

This project uses the **[Olist Brazilian E-Commerce Dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)** from Kaggle.

| Table | Records |
|---|---|
| orders | ~100,000 |
| order_items | ~112,000 |
| customers | ~99,000 |
| products | ~32,000 |
| sellers | ~3,000 |

---

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

### 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 👨‍💻 Author

**Muhammad Adnan**

[![GitHub](https://img.shields.io/badge/GitHub-MuhammadAdnan586-0a0a2e?style=flat-square&logo=github&logoColor=white)](https://github.com/MuhammadAdnan586)

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:2d2d8e,50:1a1a5e,100:0a0a2e&height=100&section=footer)

</div>
