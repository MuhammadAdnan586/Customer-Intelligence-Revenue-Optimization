# Kaise Chalayen (Local Setup)

Yeh dashboard 2 hisson mein hai: **backend** (FastAPI, MySQL se data leta hai) aur
**frontend** (Next.js, woh data dikhata hai). Dono ko **alag-alag terminal
windows** mein chalana hoga, kyunke dono ko hamesha "on" rehna chahiye.

---

## Step 1 — Backend Setup (FastAPI)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt --break-system-packages
```

(Agar `--break-system-packages` error de, to bina is flag k try karein —
yeh sirf kuch Linux systems pe zaroori hota hai.)

Phir `.env.example` file ko copy kar k `.env` banayen aur apni MySQL
password daal den:

```powershell
copy .env.example .env
```

`.env` file kholen aur `DB_PASSWORD` apni asal MySQL root password se
replace karein.

Ab backend start karein:

```powershell
uvicorn main:app --reload --port 8000
```

Browser mein `http://localhost:8000/docs` khol k confirm karein — agar
FastAPI ka interactive docs page khul jaye, backend chal raha hai. ✅

---

## Step 2 — Frontend Setup (Next.js)

**Naye terminal window** mein (backend wali window ko band na karen):

```powershell
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

Browser mein `http://localhost:3000` kholen — dashboard dikhna chahiye.

---

## Common Issues

| Masla | Fix |
|---|---|
| "CONNECTION FAILED" dashboard pe dikhe | Backend (`uvicorn`) chal raha hai ya nahi check karen |
| MySQL access denied error | `.env` mein `DB_PASSWORD` ghalat hai, dobara check karen |
| `npm install` mein error | Node.js installed hai confirm karen (`node --version`) |

---

## Screenshots/Video Lene K Leay

Dashboard `localhost:3000` pe khulne k baad, full-page screenshot le sakte
hain (browser zoom 90% rakhen taake sab kuch ek frame mein aa jaye), ya
screen-record kar k LinkedIn pe upload kar sakte hain.
