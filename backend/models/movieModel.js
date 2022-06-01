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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Movie', movieSchema);
