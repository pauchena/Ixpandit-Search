# Ixpandit Search

A search application (React frontend + Python FastAPI backend) that uses the PokeAPI as sample data.

Features:

- Search by partial name
- Pagination
- Basic caching with React Query and a FastAPI proxy
- Docker + docker-compose for local development

## Run locally with docker-compose:

```bash
docker-compose up --build
```

Frontend will be available at http://localhost:5173 and backend at http://localhost:8000
