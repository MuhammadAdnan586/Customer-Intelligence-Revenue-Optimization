const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function get(path) {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request failed: ${path} (${res.status})`);
  }
  return res.json();
}

export const api = {
  overview: () => get("/api/overview"),
  rfm: () => get("/api/rfm"),
  cohort: () => get("/api/cohort"),
  affinity: () => get("/api/affinity"),
  leakage: () => get("/api/leakage"),
};
