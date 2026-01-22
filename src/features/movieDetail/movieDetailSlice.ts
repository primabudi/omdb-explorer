import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MovieDetail, MovieDetailState } from '../../types/movie'

const initialState: MovieDetailState = {
  movie: null,
  loading: false,
  error: null,
}

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<MovieDetail>) => {
      state.movie = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetMovie: (state) => {
      state.movie = null
      state.error = null
    },
  },
})

export const {
  setMovie,
  setLoading,
  setError,
  resetMovie,
} = movieDetailSlice.actions

export default movieDetailSlice.reducer
