# Backend (FastAPI)

This service provides the Pokemon search API used by the frontend.

## Requirements

- Python 3.11+
- pip

## Run Locally

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

API will be available at:

- http://localhost:8000

## Endpoint

### GET /api/search

Query params:

- q: partial pokemon name
- page: page number (default: 1)
- per_page: page size (default: 20)

Example:

```bash
curl "http://localhost:8000/api/search?q=pika&page=1&per_page=12"
```

## Docker

From the project root:

```bash
docker-compose up --build
```

The backend container exposes port 8000.
