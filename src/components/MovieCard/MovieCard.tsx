import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import s from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  onPosterClick: (movie: Movie) => void
}

function MovieCard({ movie, onPosterClick }: MovieCardProps) {
  return (
    <div className={s.card}>
      <div onClick={() => onPosterClick(movie)}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
          alt={movie.Title}
          className={s.poster}
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = '/placeholder.svg'
          }}
        />
      </div>
      <Link to={`/movie/${movie.imdbID}`}>
        <div className={s.info}>
          <h3 className={s.title}>{movie.Title}</h3>
          <p className={s.year}>{movie.Year}</p>
          <span className={s.type}>{movie.Type}</span>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
