import { useEffect } from 'react'
import SearchBox from '../../components/SearchBox/SearchBox'
import MovieList from '../../components/MovieList/MovieList'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { setMovies, setLoading, setError } from '../../features/movies/moviesSlice'
import { searchMovies } from '../../api/omdbApi'
import { Movie } from '../../types/movie'

function Home() {
  const dispatch = useAppDispatch()
  const { movies, searchQuery, loading, error } = useAppSelector((state) => state.movies)

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery.trim()) {
        dispatch(setMovies({ movies: [], totalResults: 0 }))
        return
      }

      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const result = await searchMovies(searchQuery, 1)
        dispatch(setMovies({ movies: result.movies, totalResults: result.totalResults }))
      } catch (err) {
        dispatch(setError((err as Error).message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchMovies()
  }, [searchQuery, dispatch])

  const handlePosterClick = (movie: Movie) => {
    // TODO: show modal 
    console.log('Poster clicked:', movie.Title)
  }

  return (
    <div>
      <SearchBox />
      {searchQuery ? (
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          onPosterClick={handlePosterClick}
        />
      ) : (
        <p>Start searching to find movies</p>
      )}
    </div>
  )
}

export default Home
