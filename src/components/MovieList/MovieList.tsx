import { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'

interface MovieListProps {
  movies: Movie[]
  loading: boolean
  error: string | null
  onPosterClick: (movie: Movie) => void
  loadMoreRef?: (node: HTMLDivElement | null) => void
}

function MovieList({ movies, loading, error, onPosterClick, loadMoreRef }: MovieListProps) {
  if (loading && movies.length === 0) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (movies.length === 0) {
    return <p>No movies found</p>
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onPosterClick={onPosterClick}
        />
      ))}
      <div ref={loadMoreRef} />
      {loading && <p>Loading more...</p>}
    </div>
  )
}

export default MovieList
