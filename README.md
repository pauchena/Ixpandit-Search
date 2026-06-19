# Ixpandit PokeSearch

Pokemon search app built with a split repository structure:

- [frontend/](frontend) for the React + Vite app
- [backend/](backend) for the FastAPI service

## Preview

![Pokemon finder preview](./frontend/src/assets/landing.png)

## Features

- Search Pokemons by partial name
- Pagination
- Basic caching with React Query and a FastAPI proxy
- Docker + docker-compose for local development

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker Compose

```bash
docker-compose up --build
```

Frontend will be available at http://localhost:5173 and backend at http://localhost:8000

## Deploy

Recommended setup: deploy backend and frontend as separate services.

### 1. Deploy backend (Render/Railway/Fly)

- Root directory: `backend/`
- Build: use `backend/Dockerfile`
- Expose port `8000`
- Health check (optional): `/docs`

You will get a URL like:

`https://your-backend-domain.com`

### 2. Deploy frontend (Vercel/Netlify/Render Static)

- Root directory: `frontend/`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variable:

`VITE_API_BASE_URL=https://your-backend-domain.com/api`

Notes:

- For local Docker/Nginx, keep `VITE_API_BASE_URL=/api`.
- Example env template is in `frontend/.env.example`.
