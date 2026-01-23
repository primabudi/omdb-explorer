import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import SearchBox from '../SearchBox'
import moviesReducer from '../../../features/movies/moviesSlice'

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

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
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
})
