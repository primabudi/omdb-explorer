import { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'
import s from './MovieList.module.css'

interface MovieListProps {
  movies: Movie[]
  loading: boolean
  error: string | null
  onPosterClick: (movie: Movie) => void
  loadMoreRef?: (node: HTMLDivElement | null) => void
}

function MovieList({ movies, loading, error, onPosterClick, loadMoreRef }: MovieListProps) {
  if (loading && movies.length === 0) {
    return <p className={s.loading}>Loading...</p>
  }

  if (error) {
    return <p className={s.error}>Error: {error}</p>
  }

  if (movies.length === 0) {
    return <p className={s.empty}>No movies found</p>
  }

  return (
    <div>
      <div className={s.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onPosterClick={onPosterClick}
          />
        ))}
      </div>
      <div ref={loadMoreRef} />
      {loading && <p className={s.loading}>Loading more...</p>}
    </div>
  )
}

export default MovieList
