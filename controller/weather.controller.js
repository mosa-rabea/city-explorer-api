'use strict';
const axios = require('axios');
const Weather = require('../module/weather');
const Cache = require('../module/Cache');

let cache = new Cache();

function weatherHandel(req, res) {
  let searchQue = req.query.cityName;
  let weatherData = {};
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQue}&key=${process.env.WEATHERIBT_API_KEY}&days=5&language=en`;
  let key = `weather-${req.query.cityName}`;

  if (cache[key]) {
    res.send(cache[key].data);
  } else {
    axios.get(url).then((weatherRes) => {
      weatherData = weatherRes.data.data.map((day) => {
        return new Weather(day);
      });
      cache[key] = {};
      cache[key].timeStamp = Date.now();
      cache[key].data = weatherData;

      console.log(weatherData);
      res.send(weatherData);
    });
  }

}
module.exports = weatherHandel;
