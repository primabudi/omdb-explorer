import { useEffect, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './redux'
import { setMovies, appendMovies, setLoading, setError, setCurrentPage } from '../features/movies/moviesSlice'
import { searchMovies } from '../api/omdbApi'

function useFetchMovies() {
  const dispatch = useAppDispatch()
  const { movies, searchQuery, loading, error, currentPage, totalResults } = useAppSelector((state) => state.movies)

  const hasMoreMovies = movies.length < totalResults

  const fetchMovies = useCallback(async (query: string, page: number, isNewSearch: boolean) => {
    const trimmedQuery = query.trim()
    
    // only request to OMDB API when query is at least 3 characters
    if (trimmedQuery.length < 3) {
      dispatch(setMovies({ movies: [], totalResults: 0 }))
      return
    }

    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const result = await searchMovies(query, page)
      if (isNewSearch) {
        dispatch(setMovies({ movies: result.movies, totalResults: result.totalResults }))
      } else {
        dispatch(appendMovies({ movies: result.movies }))
      }
    } catch (err) {
      dispatch(setError((err as Error).message))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchMovies(searchQuery, 1, true)
  }, [searchQuery, fetchMovies])

  const loadMore = useCallback(() => {
    if (!loading && hasMoreMovies) {
      const nextPage = currentPage + 1
      dispatch(setCurrentPage(nextPage))
      fetchMovies(searchQuery, nextPage, false)
    }
  }, [loading, hasMoreMovies, currentPage, searchQuery, fetchMovies, dispatch])

  return {
    movies,
    searchQuery,
    loading,
    error,
    hasMoreMovies,
    loadMore,
  }
}

export default useFetchMovies
