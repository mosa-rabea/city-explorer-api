'use strict';
const axios = require('axios');
const Weather = require('../module/weather');
function weatherHandel(req, res) {
  let searchQue = req.query.cityName;
  let weatherData = {};
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQue}&key=${process.env.WEATHERIBT_API_KEY}&days=5`;

  axios.get(url).then((weatherRes) => {
    weatherData = weatherRes.data.data.map((day) => {
      return new Weather(day);
    });
    console.log(weatherData);
    res.send(weatherData);
  });
}
module.exports = weatherHandel;
