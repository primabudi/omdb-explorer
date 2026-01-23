import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import MovieCard from '../MovieCard'

const mockMovie = {
  Title: 'Batman',
  Year: '1989',
  imdbID: 'tt0096895',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderWithRouter(<MovieCard movie={mockMovie} onPosterClick={() => {}} />)
    expect(screen.getByText('Batman')).toBeInTheDocument()
    expect(screen.getByText('1989')).toBeInTheDocument()
    expect(screen.getByText('movie')).toBeInTheDocument()
  })

  it('calls onPosterClick when poster is clicked', () => {
    const handlePosterClick = vi.fn()
    renderWithRouter(<MovieCard movie={mockMovie} onPosterClick={handlePosterClick} />)
    
    // Find image by alt text
    const poster = screen.getByAltText('Batman')
    fireEvent.click(poster)
    
    expect(handlePosterClick).toHaveBeenCalledWith(mockMovie)
  })

  it('renders placeholder image when poster is N/A', () => {
    const movieNoPoster = { ...mockMovie, Poster: 'N/A' }
    renderWithRouter(<MovieCard movie={movieNoPoster} onPosterClick={() => {}} />)
    
    const poster = screen.getByAltText('Batman') as HTMLImageElement
    expect(poster.src).toContain('/placeholder.svg')
  })
})
