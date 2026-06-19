# Ixpandit Search

Ixpandit Search is a Pokemon search application built with React (frontend) and FastAPI (backend), using data from PokeAPI.

## Features

- Partial-name search (example: pika)
- Paginated search results
- FastAPI proxy layer for PokeAPI
- Basic in-memory caching on backend
- Docker setup for local execution

## Stack

- Frontend: React + Vite + React Query + Tailwind CSS
- Backend: FastAPI + httpx
- Infrastructure: Docker + Docker Compose

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.11+
- Docker and Docker Compose

## Local Development

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend

In another terminal:

```bash
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and proxies /api requests to http://localhost:8000.

## Run with Docker

```bash
docker-compose up --build
```

Frontend: http://localhost:5173

Backend: http://localhost:8000

## Useful Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
```

## API Flow

- Frontend requests GET /api/search?q=<query>&page=<page>&per_page=<size>
- Backend fetches Pokemon names from PokeAPI
- Backend filters names by partial match
- Backend returns a paginated response including sprite and types

## Challenge Checklist

- Design implemented with a modern component-based UI
- Data consumed directly from PokeAPI without Pokemon wrappers
- Partial-name search implemented
- Pagination implemented
- Dockerized setup available
- Public repository with run instructions
