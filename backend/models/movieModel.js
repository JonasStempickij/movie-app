const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide movie name'],
    },
    directors: Array,
    actors: Array,
    genre: Array,
    desc: String,
    image_url: String,
    thumb_url: String,
    rating: Number,
    year: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Movie', movieSchema);
