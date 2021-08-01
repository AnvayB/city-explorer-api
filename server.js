'use strict';

//pull project specifc env variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

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











// 'use strict';
// // pull in express
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// //const weather = require('./data/weather.json');
// const axios = require('axios');
// const getMovies = require('./modules/movies.js');
// const getWeather = require('./weather.js');

// // assign express to "app" to access its methods quickly
// const app = express();
// dotenv.config();
// app.use(cors());


// const PORT = process.env.PORT || 3001;

// app.get('/weather', Weather);
// function Weather(req,res) {
//   const searchWeather = req.query.searchQuery;
//   getWeather(searchWeather)
//     .then(weatherList => res.send(weatherList))
//     .catch(error => console.log(error));
// }

// app.get('/movies', Movies);
// function Movies(req,res) {
//   const searchMovie = req.query.searchQuery;
//   getMovies(searchMovie)
//     .then(movieList => res.send(movieList))
//     .catch(error => console.log(error));
// }

// app.use('*', notFound);
// function notFound (res) {
//   res.status(404).send("Search request not found.");
// }

// app.listen(PORT, () => {
//   console.log(`Server works on ${PORT}`);
// });





