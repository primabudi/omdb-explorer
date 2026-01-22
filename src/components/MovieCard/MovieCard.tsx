import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
  onPosterClick: (movie: Movie) => void
}

function MovieCard({ movie, onPosterClick }: MovieCardProps) {
  const handlePosterClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onPosterClick(movie)
  }

  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'

  return (
    <div>
      <img
        src={posterSrc}
        alt={movie.Title}
        onClick={handlePosterClick}
        style={{ cursor: 'pointer' }}
      />
      <div>
        <Link to={`/movie/${movie.imdbID}`}>
          <h3>{movie.Title}</h3>
        </Link>
        <p>{movie.Year}</p>
        <span>{movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieCard
