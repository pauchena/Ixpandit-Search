import React from 'react'
import Search from './components/Search'
import IxpanditLogo from './components/IxpanditLogo'

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top navigation bar */}
      <nav className="border-b bg-white/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <IxpanditLogo />
          </div>
          <a href="https://ixpandit.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-3 gradient-text">
            Pokémon Finder
          </h1>
          <p className="text-lg text-muted-foreground">
            Search and explore your favorite Pokémon with advanced pagination
          </p>
        </header>
        <Search />
      </div>
      <footer className="border-t">
        <div className="max-w-4xl mx-auto w-full px-4 py-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Made by{' '}
            <a
              href="https://linkedin.com/in/pauchena"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              pauchena
            </a>
          </span>
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
