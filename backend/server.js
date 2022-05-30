const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const movieRoutes = require('./routes/movieRoutes');

app.use('/api/movies', movieRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
