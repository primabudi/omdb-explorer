import { useParams, Link } from 'react-router-dom'
import useFetchMovieDetail from '../../hooks/useFetchMovieDetail'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { movie, loading, error } = useFetchMovieDetail(id)

  if (loading) {
    return (
      <div>
        <Link to="/">← Back to Search</Link>
        <p>Loading movie details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Link to="/">← Back to Search</Link>
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div>
        <Link to="/">← Back to Search</Link>
        <p>Movie not found</p>
      </div>
    )
  }

  const genres = movie.Genre ? movie.Genre.split(', ') : []
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <div>
      <Link to="/">← Back to Search</Link>
      
      <div>
        {hasValidPoster ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            style={{ maxWidth: '300px' }}
          />
        ) : (
          <div>No Poster Available</div>
        )}
      </div>

      <h1>{movie.Title}</h1>
      
      <p>
        {movie.Year} • {movie.Rated} • {movie.Runtime} • {movie.Type}
      </p>

      {genres.length > 0 && (
        <p>Genres: {genres.join(', ')}</p>
      )}

      {movie.Plot && movie.Plot !== 'N/A' && (
        <div>
          <h3>Plot</h3>
          <p>{movie.Plot}</p>
        </div>
      )}

      <div>
        {movie.Director && movie.Director !== 'N/A' && (
          <p><strong>Director:</strong> {movie.Director}</p>
        )}
        {movie.Writer && movie.Writer !== 'N/A' && (
          <p><strong>Writer:</strong> {movie.Writer}</p>
        )}
        {movie.Actors && movie.Actors !== 'N/A' && (
          <p><strong>Cast:</strong> {movie.Actors}</p>
        )}
      </div>

      {movie.Ratings && movie.Ratings.length > 0 && (
        <div>
          <h3>Ratings</h3>
          <ul>
            {movie.Ratings.map((rating) => (
              <li key={rating.Source}>
                {rating.Source}: {rating.Value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
          <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
        )}
        {movie.Awards && movie.Awards !== 'N/A' && (
          <p><strong>Awards:</strong> {movie.Awards}</p>
        )}
        {movie.Country && movie.Country !== 'N/A' && (
          <p><strong>Country:</strong> {movie.Country}</p>
        )}
        {movie.Language && movie.Language !== 'N/A' && (
          <p><strong>Language:</strong> {movie.Language}</p>
        )}
      </div>
    </div>
  )
}

export default MovieDetail
