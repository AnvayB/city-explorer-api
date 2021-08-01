'use strict';

//pull project specifc env variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

//build routes for incoming requests
app.get('/movies', movieHandler);

app.get('/weather', weatherHandler);

//plug in 404 error handling
app.use('*', notFoundHandler);

function notFoundHandler(req, res) {
  res.status(404).send('route not found')
}

function movieHandler(req,res) {
  const location = req.query.city;

  getMovies(location)
    .then(moviesList => res.send(moviesList))
    .catch(err => console.error(err));

}

function weatherHandler (req, res) {
  const weatherQuery = req.query.city;
  
  getWeather(weatherQuery)
    .then(weatherList => res.send(weatherList))
    .catch(err => console.error(err));

}



app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
