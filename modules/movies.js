'use strict';

const axios = require('axios');
const cache = require('./cache.js');

function getMovies(location) {
  const key = 'movies-' + location;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${location}`;

  if(!cache[key]) {
    cache[key] = {}; 
    cache[key].timestamp = Date.now(); 
    cache[key].data = axios.get(movieURL)
      .then(data => parseMovieData(data.data))
  }
  return cache[key].data;
}

function parseMovieData(data) {
  try {
    const movies = data.results.map(movie => {
      return new Movie(movie);
    })
    return Promise.resolve(movies); 
  } catch (err) {
    return Promise.reject(err);
  }
}

class Movie {
  constructor(movie) {
    this.tableName = 'movies',
    this.title = movie.title,
    this.overview = movie.overview,
    this.averagevotes = movie.vote_average,
    this.totalVotes = movie.vote_count,
    this.imageUrl = movie.poster_path,
    this.popularity = movie.popularity,
    this.releasedOn = movie.release_date,
    this.timestamp = Date.now() 
  }
}

module.exports = getMovies;