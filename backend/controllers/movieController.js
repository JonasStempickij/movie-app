const path = require('path');
const { readFile } = require('fs/promises');

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Movie = require('../models/movieModel');
const User = require('../models/userModel');

//  @desc   Get movies
//  @route  GET /api/movies
//  @access Private
const getMovies = asyncHandler(async (req, res) => {
  let result = Movie.find({ user: req.user.id });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 16;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const movies = await result;

  const totalMovies = await Movie.countDocuments({ user: req.user.id }); // needs changing
  const numOfPages = Math.ceil(totalMovies / limit);

  res.status(200).json({ movies, totalMovies, numOfPages });
});

//  @desc   Get single movie
//  @route  GET /api/movies/:id
//  @access Private
const getMovie = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error('Please provide movie id');
  }
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(400);
    throw new Error('Movie not found');
  }
  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json(movie);
});

//  @desc   Add movie
//  @route  POST /api/movies
//  @access Private
const addMovie = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please provide movie name');
  }
  const movie = await Movie.create({
    name: req.body.name,
    user: req.user.id,
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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Logged in user has to match movie added by that user
  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Logged in user has to match movie added by that user
  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await movie.remove();

  res.status(200).json({ id: req.params.id });
});

// Populate user with top 250 imdb movies
const imdbMovies = asyncHandler(async (req, res) => {
  try {
    await Movie.deleteMany({ user: req.user.id });
    const mockPath = path.resolve(__dirname, '../mockdata/top250_min.json');
    const mockMovies = JSON.parse(await readFile(mockPath));
    const userMovies = mockMovies.map((movie) => {
      return {
        ...movie,
        user: req.user.id,
      };
    });
    await Movie.create(userMovies);
    console.log('Success');
    res.status(200).json(userMovies);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('Something went wrong');
  }
});

module.exports = {
  getMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  imdbMovies,
};
