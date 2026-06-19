import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type PokemonResult = {
  name: string
  sprite: string | null
  types: string[]
}

type SearchResponse = {
  results: PokemonResult[]
  total: number
}

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-100 text-orange-700 border-orange-200',
  water: 'bg-blue-100 text-blue-700 border-blue-200',
  grass: 'bg-green-100 text-green-700 border-green-200',
  electric: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  psychic: 'bg-pink-100 text-pink-700 border-pink-200',
  ice: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  dragon: 'bg-violet-100 text-violet-700 border-violet-200',
  dark: 'bg-gray-800 text-gray-100 border-gray-700',
  fairy: 'bg-rose-100 text-rose-700 border-rose-200',
  normal: 'bg-gray-100 text-gray-600 border-gray-200',
  fighting: 'bg-red-100 text-red-700 border-red-200',
  flying: 'bg-sky-100 text-sky-700 border-sky-200',
  poison: 'bg-purple-100 text-purple-700 border-purple-200',
  ground: 'bg-amber-100 text-amber-700 border-amber-200',
  rock: 'bg-stone-100 text-stone-700 border-stone-200',
  bug: 'bg-lime-100 text-lime-700 border-lime-200',
  ghost: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  steel: 'bg-slate-100 text-slate-600 border-slate-200',
}

function useSearch(query: string, page: number, perPage: number) {
  return useQuery(
    ['search', query, page, perPage],
    async (): Promise<SearchResponse> => {
      if (!query) return { results: [], total: 0 }
      const res = await axios.get('/api/search', { params: { q: query, page, per_page: perPage } })
      return res.data as SearchResponse
    },
    { keepPreviousData: true, staleTime: 1000 * 60 }
  )
}

export default function Search(): JSX.Element {
  const [q, setQ] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  })

  useEffect(() => {
    function onResize() {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const columns = viewport.width >= 768 ? 4 : viewport.width >= 640 ? 3 : 2
  const reservedHeight = viewport.width >= 768 ? 500 : 460
  const cardApproxHeight = 185
  const rowsVisible = Math.max(1, Math.floor((viewport.height - reservedHeight) / cardApproxHeight))
  const perPage = Math.max(columns, Math.min(20, columns * rowsVisible))

  const { data, isLoading, isFetching } = useSearch(q, page, perPage)

  useEffect(() => {
    setPage(1)
  }, [perPage])

  function handleSearch(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    setPage(1)
    setQ(inputValue)
  }

  const totalPages = data?.total ? Math.ceil(data.total / perPage) : 0

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto w-full">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Pokémon by name..."
          className="h-12 text-base bg-white border-2 border-gray-200 focus:border-violet-500 focus:ring-0"
        />
        <Button 
          type="submit" 
          disabled={isFetching}
          className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-medium transition-all"
        >
          {isFetching ? 'Searching…' : 'Search'}
        </Button>
      </form>

      {q && (
        <>
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-bold">
              <span className="gradient-text">Results</span>
            </h2>
            {data?.total !== undefined && (
              <p className="text-sm text-muted-foreground mt-1">
                Found <span className="font-semibold text-foreground">{data.total}</span> Pokémon
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: perPage }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
              ))}
            </div>
          ) : data?.results?.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No Pokémon found matching "<span className="font-medium">{q}</span>"</p>
              <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data?.results?.map((p) => (
                <Card 
                  key={p.name} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white hover:scale-105 hover:shadow-violet-200/50"
                >
                  <CardContent className="flex flex-col items-center gap-3 pt-6 pb-4 bg-gradient-to-br from-white via-emerald-50 to-violet-50">
                    {p.sprite ? (
                      <img src={p.sprite} alt={p.name} className="w-24 h-24 object-contain drop-shadow-sm" />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-semibold">
                        —
                      </div>
                    )}
                    <p className="font-bold capitalize text-sm text-center text-gray-900">{p.name}</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {p.types?.map((t: string) => (
                        <Badge key={t} className={`capitalize text-xs ${TYPE_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-6 border-2 hover:border-violet-500 hover:text-violet-600"
              >
                ← Previous
              </Button>
              <span className="text-sm font-medium text-gray-600">
                Page <span className="text-violet-600 font-bold">{page}</span> of <span className="text-violet-600 font-bold">{totalPages}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={(data?.results?.length ?? 0) < perPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 border-2 hover:border-emerald-500 hover:text-emerald-600"
              >
                Next →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
