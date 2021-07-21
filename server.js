'use strict';
// pull in express
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { request } = require('express');

// assign express to "app" to access its methods quickly
const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


// TODO: add routes - ie: app.get('/route')
// open up your server on port for incoming traffic

app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let data = weatherData.find(place => place.city_name === searchQuery);

  let daysArray = [];
  data.data.map((place) => {
    daysArray.push(new Forecast(place.datetime, `Low temperature of ${place.low_temp}, High temperature of ${place.high_temp}, with ${place.weather.description} weather.`));
  });

  res.send(daysArray);

})




app.listen(PORT, () => {
  console.log(`Server works on ${PORT}`);
})