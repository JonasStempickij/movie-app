const path = require("path");
const { readFile } = require("fs/promises");
//  eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
//  eslint-disable-next-line no-unused-vars
const colors = require("colors");
const connectDB = require("./config/db");
const Movie = require("./models/movieModel");

const start = async () => {
  try {
    await connectDB();
    await Movie.deleteMany();
    const mockPath = path.resolve(__dirname + "/mockdata/top250_min.json");
    const mockMovies = JSON.parse(await readFile(mockPath));
    const userMovies = mockMovies.map((movie) => {
      return {
        ...movie,
        user: "6295d1aaad472f3b30276ada",
      };
    });
    await Movie.create(userMovies);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
