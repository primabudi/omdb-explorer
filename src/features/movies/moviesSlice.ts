import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MoviesState } from '../../types/movie'

const initialState: MoviesState = {
  movies: [],
  searchQuery: '',
  currentPage: 1,
  totalResults: 0,
  loading: false,
  error: null,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      state.movies = []
    },
    setMovies: (state, action: PayloadAction<{ movies: Movie[]; totalResults: number }>) => {
      state.movies = action.payload.movies
      state.totalResults = action.payload.totalResults
    },
    appendMovies: (state, action: PayloadAction<{ movies: Movie[] }>) => {
      state.movies = [...state.movies, ...action.payload.movies]
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetMovies: (state) => {
      state.movies = []
      state.currentPage = 1
      state.totalResults = 0
      state.error = null
    },
  },
})

export const {
  setSearchQuery,
  setMovies,
  appendMovies,
  setCurrentPage,
  setLoading,
  setError,
  resetMovies,
} = moviesSlice.actions

export default moviesSlice.reducer
