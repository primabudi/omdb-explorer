import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import MovieList from '../MovieList'

const mockMovies = [
  {
    Title: 'Batman',
    Year: '1989',
    imdbID: 'tt0096895',
    Type: 'movie',
    Poster: 'N/A',
  },
  {
    Title: 'Batman Returns',
    Year: '1992',
    imdbID: 'tt0103776',
    Type: 'movie',
    Poster: 'N/A',
  },
]

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('MovieList', () => {
  it('renders loading state', () => {
    renderWithRouter(
      <MovieList
        movies={[]}
        loading={true}
        error={null}
        onPosterClick={() => {}}
      />
    )
    expect(screen.getAllByTestId('skeleton')).toHaveLength(5)
  })

  it('renders error state', () => {
    renderWithRouter(
      <MovieList
        movies={[]}
        loading={false}
        error="Something went wrong"
        onPosterClick={() => {}}
      />
    )
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument()
  })

  it('renders list of movies', () => {
    renderWithRouter(
      <MovieList
        movies={mockMovies}
        loading={false}
        error={null}
        onPosterClick={() => {}}
      />
    )
    expect(screen.getByText('Batman')).toBeInTheDocument()
    expect(screen.getByText('Batman Returns')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    renderWithRouter(
      <MovieList
        movies={[]}
        loading={false}
        error={null}
        onPosterClick={() => {}}
      />
    )
    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })
})
