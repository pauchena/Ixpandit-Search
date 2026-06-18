import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function useSearch(query, page, perPage) {
  return useQuery(['search', query, page, perPage], async () => {
    if (!query) return { results: [], total: 0 }
    const res = await axios.get(`/api/search`, {
      params: { q: query, page, per_page: perPage }
    })
    return res.data
  }, { keepPreviousData: true, staleTime: 1000 * 60 })
}

export default function Search() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 12

  const { data, isLoading, error } = useSearch(q, page, perPage)

  function handleSearch(ev) {
    ev.preventDefault()
    setPage(1)
    const form = new FormData(ev.target)
    setQ(form.get('q') || '')
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input name="q" className="flex-1 p-2 border rounded" placeholder="Enter partial name" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Search error</div>}

      <div className="grid grid-cols-3 gap-4">
        {data?.results?.map((p) => (
          <div key={p.name} className="bg-white p-3 rounded shadow-sm flex gap-3 items-center">
            <img src={p.sprite} alt={p.name} className="w-16 h-16" />
            <div>
              <div className="font-medium capitalize">{p.name}</div>
              <div className="text-sm text-slate-500">{p.types?.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-600">Total: {data?.total ?? 0}</div>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded">{page}</div>
          <button disabled={(data?.results?.length ?? 0) < perPage} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
