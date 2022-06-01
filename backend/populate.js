const path = require('path');
const { readFile } = require('fs/promises');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const Movie = require('./models/movieModel');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    const mockPath = path.resolve(__dirname + '/mockdata/top250_min.json');
    const mockMovies = JSON.parse(await readFile(mockPath));
    const userMovies = mockMovies.map((movie) => {
      return {
        ...movie,
        user: '6295d1aaad472f3b30276ada',
      };
    });
    await Movie.create(userMovies);
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
