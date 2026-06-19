import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import Search from './Search'

vi.mock('axios')

function renderSearch() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  )
}

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('requests partial-name search with pagination params', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ name: 'pikachu', sprite: null, types: ['electric'] }],
        total: 1,
      },
    })

    renderSearch()

    fireEvent.change(screen.getByPlaceholderText('Enter a name to search'), {
      target: { value: 'pika' },
    })

    const input = screen.getByPlaceholderText('Enter a name to search')
    const form = input.closest('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/search', {
        params: { q: 'pika', page: 1, per_page: 12 },
      })
    })

    expect(await screen.findByText('Search results')).toBeTruthy()
    expect(await screen.findByText('pikachu')).toBeTruthy()
  })

  test('shows empty state when no matches are returned', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [],
        total: 0,
      },
    })

    renderSearch()

    fireEvent.change(screen.getByPlaceholderText('Enter a name to search'), {
      target: { value: 'zzzzz' },
    })

    const input = screen.getByPlaceholderText('Enter a name to search')
    const form = input.closest('form')
    fireEvent.submit(form)

    expect(await screen.findByText('No results found.')).toBeTruthy()
  })
})
