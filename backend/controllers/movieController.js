const asyncHandler = require('express-async-handler');

//  @desc   Get movies
//  @route  GET /api/movies
//  @access Private
const getMovies = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get movies' });
});

//  @desc   Add movie
//  @route  POST /api/movies
//  @access Private
const addMovie = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Add movie' });
});

//  @desc   Update movie with id
//  @route  PUT /api/movies/:id
//  @access Private
const updateMovie = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update movie ${req.params.id}` });
});

//  @desc   Delete movie with id
//  @route  DELETE /api/movies/:id
//  @access Private
const deleteMovie = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete movie ${req.params.id}` });
});

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
