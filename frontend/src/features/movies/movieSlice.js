import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from './movieService';

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Add new movie
export const addMovie = createAsyncThunk(
  'movies/create',
  async (movieData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.addMovie(movieData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user movies
export const getMovies = createAsyncThunk(
  'movies/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.getMovies(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete movie
export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.deleteMovie(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload.id
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;
