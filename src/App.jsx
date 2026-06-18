import React from 'react'
import Search from './components/Search'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Ixpandit Search</h1>
          <p className="text-sm text-slate-600">Search entities (e.g. Pokémon) quickly</p>
        </header>
        <Search />
      </div>
    </div>
  )
}
