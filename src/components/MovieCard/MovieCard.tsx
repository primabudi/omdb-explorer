import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import s from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  onPosterClick: (movie: Movie) => void
}

function MovieCard({ movie, onPosterClick }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const handlePosterClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onPosterClick(movie)
  }

  const posterSrc = movie.Poster !== 'N/A' && !imageError 
    ? movie.Poster 
    : '/placeholder.svg'

  return (
    <div className={s.card}>
      <img
        src={posterSrc}
        alt={movie.Title}
        onClick={handlePosterClick}
        onError={() => setImageError(true)}
        className={s.poster}
      />
      <div className={s.info}>
        <h3 className={s.title}>
          <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
        </h3>
        <p className={s.year}>{movie.Year}</p>
        <span className={s.type}>{movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieCard
