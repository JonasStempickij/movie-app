const express = require("express");
const router = express.Router();
const {
  getMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  imdbMovies,
} = require("../controllers/movieController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getMovies)
  .post(protect, addMovie)
  .put(protect, imdbMovies);
router
  .route("/:id")
  .put(protect, updateMovie)
  .delete(protect, deleteMovie)
  .get(protect, getMovie);

module.exports = router;
