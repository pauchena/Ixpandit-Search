import React from 'react'
import Search from './components/Search'

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-1">Pokemon finder</h1>
          <p className="text-muted-foreground">Search for your favorite Pokémon</p>
        </header>
        <Search />
      </div>
      <footer className="border-t">
        <div className="max-w-4xl mx-auto w-full px-4 py-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Made by pauchena</span>
          <a
            href="https://github.com/pauchena/Ixpandit-Search"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            My repo
          </a>
        </div>
      </footer>
    </div>
  )
}
