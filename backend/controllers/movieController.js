const asyncHandler = require('express-async-handler');

const Movie = require('../models/movieModel');

//  @desc   Get movies
//  @route  GET /api/movies
//  @access Private
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();

  res.status(200).json(movies);
});

//  @desc   Add movie
//  @route  POST /api/movies
//  @access Private
const addMovie = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please provide movie title');
  }
  const movie = await Movie.create({
    title: req.body.title,
  });
  res.status(200).json(movie);
});

//  @desc   Update movie with id
//  @route  PUT /api/movies/:id
//  @access Private
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400);
    throw new Error('Movie not found');
  }

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedMovie);
});

//  @desc   Delete movie with id
//  @route  DELETE /api/movies/:id
//  @access Private
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400);
    throw new Error('Movie not found');
  }

  await movie.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
