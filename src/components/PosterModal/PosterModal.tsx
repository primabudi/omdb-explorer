import { Movie } from '../../types/movie'
import s from './PosterModal.module.css'

interface PosterModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

function PosterModal({ movie, isOpen, onClose }: PosterModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !movie) {
    return null
  }

  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.content}>
        <button className={s.closeButton} onClick={onClose}>
          ✕
        </button>

        {hasValidPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className={s.poster}
          />
        ) : (
          <div className={s.fallback}>
            No Poster Available
          </div>
        )}

        <p className={s.title}>
          {movie.Title} ({movie.Year})
        </p>
      </div>
    </div>
  )
}

export default PosterModal


