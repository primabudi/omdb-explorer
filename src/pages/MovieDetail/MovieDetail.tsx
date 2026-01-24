import { useParams, Link } from 'react-router-dom'
import useFetchMovieDetail from '../../hooks/useFetchMovieDetail'
import s from './MovieDetail.module.css'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { movie, loading, error } = useFetchMovieDetail(id)

  if (loading) {
    return (
      <div className={s.container}>
        <Link to="/" className={s.backLink}>← Back to Search</Link>
        <p className={s.loading}>Loading movie details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={s.container}>
        <Link to="/" className={s.backLink}>← Back to Search</Link>
        <p className={s.error}>Error: {error}</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className={s.container}>
        <Link to="/" className={s.backLink}>← Back to Search</Link>
        <p className={s.error}>Movie not found</p>
      </div>
    )
  }

  const genres = movie.Genre ? movie.Genre.split(', ') : []

  return (
    <div className={s.container}>
      <Link to="/" className={s.backLink}>← Back to Search</Link>
      
      <div className={s.content}>
        <div>
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

        <div>
          <h1 className={s.title}>{movie.Title}</h1>
          <p className={s.meta}>
            {movie.Year} • {movie.Rated} • {movie.Runtime} • {movie.Type}
          </p>

          {genres.length > 0 && (
            <p className={s.genres}>Genres: {genres.join(', ')}</p>
          )}

          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Plot</h3>
              <p className={s.plot}>{movie.Plot}</p>
            </div>
          )}

          <div className={s.credits}>
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
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Ratings</h3>
              <ul className={s.ratingsList}>
                {movie.Ratings.map((rating) => (
                  <li key={rating.Source} className={s.ratingItem}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={s.additional}>
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
      </div>
    </div>
  )
}

export default MovieDetail