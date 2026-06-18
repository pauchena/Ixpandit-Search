from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from cachetools import cached, TTLCache

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

all_cache = TTLCache(maxsize=1, ttl=60 * 60)  # 1 hour

@cached(all_cache)
def fetch_all_names():
    url = 'https://pokeapi.co/api/v2/pokemon?limit=100000'
    r = httpx.get(url, timeout=10)
    r.raise_for_status()
    data = r.json()
    return [p['name'] for p in data.get('results', [])]


@app.get('/api/search')
async def search(q: str = '', page: int = 1, per_page: int = 20):
    if not q:
        return {"results": [], "total": 0}

    names = fetch_all_names()
    qlow = q.lower()
    matches = [n for n in names if qlow in n.lower()]
    total = len(matches)

    # pagination
    start = (page - 1) * per_page
    end = start + per_page
    slice_names = matches[start:end]

    results = []
    async with httpx.AsyncClient() as client:
        for name in slice_names:
            try:
                r = await client.get(f'https://pokeapi.co/api/v2/pokemon/{name}', timeout=10)
                if r.status_code == 200:
                    d = r.json()
                    sprite = d.get('sprites', {}).get('front_default')
                    types = [t['type']['name'] for t in d.get('types', [])]
                    results.append({"name": name, "sprite": sprite, "types": types})
            except Exception:
                continue

    return {"results": results, "total": total}
