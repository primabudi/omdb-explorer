import axiosInstance from './axios'
import { Movie, MovieDetail } from '../types/movie'

interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
  Error?: string
}

interface MovieDetailResponse extends MovieDetail {
  Response: string
  Error?: string
}

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await axiosInstance.get<SearchResponse>('', {
    params: {
      s: query,
      page,
    },
  })

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Failed to search movies')
  }

  return {
    movies: response.data.Search,
    totalResults: parseInt(response.data.totalResults, 10),
  }
}

export const getMovieById = async (imdbId: string) => {
  const response = await axiosInstance.get<MovieDetailResponse>('', {
    params: {
      i: imdbId,
      plot: 'full',
    },
  })

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie not found')
  }

  return response.data
}
