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
