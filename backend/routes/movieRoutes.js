const express = require('express');
const router = express.Router();
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMovies).post(protect, addMovie);
router.route('/:id').put(protect, updateMovie).delete(protect, deleteMovie);

module.exports = router;
