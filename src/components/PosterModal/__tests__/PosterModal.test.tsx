import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PosterModal from '../PosterModal'

const mockMovie = {
  Title: 'Batman',
  Year: '1989',
  imdbID: 'tt0096895',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
}

describe('PosterModal', () => {
  it('renders nothing when closed', () => {
    render(
      <PosterModal
        movie={mockMovie}
        isOpen={false}
        onClose={() => {}}
      />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders modal content when open', () => {
    render(
      <PosterModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
      />
    )
    expect(screen.getByText(/Batman/)).toBeInTheDocument()
    expect(screen.getByAltText('Batman')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(
      <PosterModal
        movie={mockMovie}
        isOpen={true}
        onClose={handleClose}
      />
    )
    
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalled()
  })

})
