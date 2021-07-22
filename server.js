'use strict';
// pull in express
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weather = require('./data/weather.json');
const { request, response } = require('express');
const axios = require('axios');

// assign express to "app" to access its methods quickly
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


// class Forecast {
//   constructor(date, description) {
//     this.date = date;
//     this.description = description;
//   }
// }

// TODO: add routes - ie: app.get('/route')
// open up your server on port for incoming traffic

app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  
  let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  //let data = weather.find(place => place.city_name === searchQuery);
  
  axios.get(weatherAPI).then(response => { 
    let weather = response.data;
    let days = []; 
    weather.data.map( (value,idx) => {
    days.push(new Forecast(value.datetime, `Average Temperature of ${value.temp} and ${value.weather.description} weather`));
    });
    console.log(days);
    res.send(days);
  }).catch(err => console.log(err))  
    class Forecast{
      constructor(date, description){
        this.date = date;
        this.description = description;
      }
    }
})

app.get('/movies', getMovies);
  function getMovies (req,res) {
    let searchQuery = req.query.searchQuery;
    let moviesAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&region=${searchQuery}`;
    axios.get(moviesAPI).then(response => {
      let movies = response.data.results;
      let sortedMovies = movies.sort((a,b) => b.popularity - a.popularity);
      console.log(sortedMovies);
      let movieArray = [];
      for(let i=0; i<20; i++){
        movieArray.push(new Movie(
          sortedMovies[i].title, 
          sortedMovies[i].overview, 
          sortedMovies[i].vote_count, 
          sortedMovies[i].poster_path, 
          sortedMovies[i].popularity, 
          sortedMovies[i].release_date));
      }
      console.log(movieArray.length);
      res.send(movieArray);
    }).catch(error => console.log(error));

    class Movie {
      constructor(title, overview, votes, imageUrl, popularity, releasedOn) {
        this.title = title;
        this.overview = overview;
        this.votes = votes;
        this.imageUrl = imageUrl;
        this.popularity = popularity;
        this.releasedOn = releasedOn;
      }
    }
    
    
  }

  app.listen(PORT, () => {
    console.log(`Server works on ${PORT}`);
  });

  // res.send(weather);
  
  // let days = [];
  // data.data.map((place) => {
  //   days.push(new Forecast(place.date, `Low temperature of ${place.low_temp}, High temperature of ${place.high_temp}, with ${place.weather.description} weather.`));
  // });

  // res.send(days);



