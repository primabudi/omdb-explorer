import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import SearchBox from '../SearchBox'
import moviesReducer from '../../../features/movies/moviesSlice'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock useDebounce
vi.mock('../../../hooks/useDebounce', () => ({
  default: (value: string) => value,
}))

// Mock omdbApi
vi.mock('../../../api/omdbApi', () => ({
  searchMovies: vi.fn(),
}))

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      movies: moviesReducer,
    },
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    )
  }
}

describe('SearchBox', () => {
  it('renders input field', () => {
    renderWithProviders(<SearchBox />)
    expect(screen.getByPlaceholderText(/Search movies/i)).toBeInTheDocument()
  })

  it('updates input value on change', () => {
    renderWithProviders(<SearchBox />)
    const input = screen.getByPlaceholderText(/Search movies/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Batman' } })
    expect(input.value).toBe('Batman')
  })

  it('dispatches search on Enter', () => {
    const { store } = renderWithProviders(<SearchBox />)
    const input = screen.getByPlaceholderText(/Search movies/i)
    
    // Type and press enter
    fireEvent.change(input, { target: { value: 'Batman' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    expect(store.getState().movies.searchQuery).toBe('Batman')
  })

  it('dispatches search on Button click', () => {
    const { store } = renderWithProviders(<SearchBox />)
    const input = screen.getByPlaceholderText(/Search movies/i)
    const button = screen.getByText('Search')
    
    fireEvent.change(input, { target: { value: 'Superman' } })
    fireEvent.click(button)
    
    expect(store.getState().movies.searchQuery).toBe('Superman')
  })
})
