import { useEffect, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './redux'
import { setMovie, setLoading, setError, resetMovie } from '../features/movieDetail/movieDetailSlice'
import { getMovieById } from '../api/omdbApi'

function useFetchMovieDetail(imdbId: string | undefined) {
  const dispatch = useAppDispatch()
  const { movie, loading, error } = useAppSelector((state) => state.movieDetail)

  const fetchMovieDetail = useCallback(async () => {
    if (!imdbId) return

    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const result = await getMovieById(imdbId)
      dispatch(setMovie(result))
    } catch (err) {
      dispatch(setError((err as Error).message))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, imdbId])

  useEffect(() => {
    fetchMovieDetail()
    return () => {
      dispatch(resetMovie())
    }
  }, [fetchMovieDetail, dispatch])

  return { movie, loading, error }
}

export default useFetchMovieDetail
