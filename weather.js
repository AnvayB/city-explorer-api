'use strict';

const axios = require('axios');
const cache = require('./cache.js');

function getWeather(location) {
  const key = 'weather-' + location;
  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${process.env.WEATHER_API_KEY}`;

  if(!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherURL)
      .then(data => parseWeatherData(data.data))
  }
  return cache[key].data;
}

function parseWeatherData(data) {
  try {
    const forecast = data.data.map(weather => {
      return new Forecast(weather);
    })
    return Promise.resolve(forecast);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Forecast {
  constructor(weather) {
    this.date = weather.datetime;
    this.description = `Low of ${weather.low_temp}, High of ${weather.high_temp} with ${weather.weather.description.toLowerCase()}`;
    this.timestamp = Date.now;
  }
}

module.exports = getWeather;