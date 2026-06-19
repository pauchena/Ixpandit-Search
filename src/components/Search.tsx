import React, { useState } from 'react'
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
  const perPage = 12

  const { data, isLoading, isFetching } = useSearch(q, page, perPage)

  function handleSearch(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    setPage(1)
    setQ(inputValue)
  }

  const totalPages = data?.total ? Math.ceil(data.total / perPage) : 0

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name to search"
          className="h-10"
        />
        <Button type="submit" disabled={isFetching} className="h-10 px-6">
          {isFetching ? 'Searching…' : 'Search'}
        </Button>
      </form>

      {q && (
        <>
          <div>
            <h2 className="text-lg font-semibold">Search results</h2>
            {data?.total !== undefined && (
              <p className="text-sm text-muted-foreground">
                {data.total} result{data.total !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: perPage }).map((_, i) => (
                <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : data?.results?.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No results found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data?.results?.map((p) => (
                <Card key={p.name} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col items-center gap-2 pt-4">
                    {p.sprite ? (
                      <img src={p.sprite} alt={p.name} className="w-20 h-20 object-contain" />
                    ) : (
                      <div className="w-20 h-20 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                        ?
                      </div>
                    )}
                    <p className="font-medium capitalize text-sm text-center">{p.name}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {p.types?.map((t: string) => (
                        <Badge key={t} className={`capitalize ${TYPE_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}>
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
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={(data?.results?.length ?? 0) < perPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
