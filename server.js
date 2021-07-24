'use strict';
// pull in express
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const weather = require('./data/weather.json');
const axios = require('axios');
const getMovies = require('./movies.js');
const getWeather = require('./weather.js');

// assign express to "app" to access its methods quickly
const app = express();
dotenv.config();
app.use(cors());


const PORT = process.env.PORT || 3001;

app.get('/weather', Weather);
function Weather(req,res) {
  const searchWeather = req.query.searchQuery;
  getWeather(searchWeather)
    .then(weatherList => res.send(weatherList))
    .catch(error => console.log(error));
}

app.get('/movies', Movies);
function Movies(req,res) {
  const searchMovie = req.query.searchQuery;
  getMovies(searchMovie)
    .then(movieList => res.send(movieList))
    .catch(error => console.log(error));
}

app.use('*', notFound);
function notFound (res) {
  res.status(404).send("Search request not found.");
}

app.listen(PORT, () => {
  console.log(`Server works on ${PORT}`);
});





