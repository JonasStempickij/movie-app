import axios from 'axios';

const API_URL = '/api/movies/';

// Add new movie
const addMovie = async (movieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, movieData, config);

  return response.data;
};

// Get user movies
const getMovies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user movie
const deleteMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + movieId, config);

  return response.data;
};

// Get single user movie
const getMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + movieId, config);

  return response.data;
};

// Get single user movie
const imdbMovies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, '', config);

  return response.data;
};

const movieService = {
  addMovie,
  getMovies,
  deleteMovie,
  getMovie,
  imdbMovies,
};

export default movieService;
