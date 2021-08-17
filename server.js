const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const cityexplorer = express();
cityexplorer.use(cors());

// Method >> ('end point',callback)

cityexplorer.get('/', (request, response) => {
  response.send('Hello i am here , can you here Me ..');
});

// cityexplorer.get('/weather', (request, response) => {
//   let data;
//   data = jsondata.find(
//     (data) =>
//       ~~+ data.lon ===~~+request.query.lon &&
//       ~~+ data.lat === ~~+request.query.lat &&
//       ~~+data.city_name === ~~+request.query.city_name
//   );
//   if (data) {
//     response.send(data.data.map((data) => new Weather(data)));
//   } else {
//     response.status(500).send('No Data Found');
//   }
// });

cityexplorer.get('/weather', (req, res) => {
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
});

class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

cityexplorer.get('/movies', (req, res) => {
  let movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.cityName}`;

  let movieDataArr = [];

  axios
    .get(movieUrl)
    .then((movieRes) => {
      movieRes.data.results.map((each) => {
        movieDataArr.push(new Movies(each));
      });
      res.send(movieDataArr);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

class Movies {
  constructor(city) {
    this.title = city.title;
    this.overview = city.overview;
    this.averageVotes = city.vote_average;
    this.vote_count = city.vote_count;
    this.imageUrl = `https://image.tmdb.org/t/p/w500/${city.poster_path}`;
    this.popularity = city.popularity;
    this.releasedOn = city.release_date;
  }
}
// cityexplorer.get('/weather', (request,response)=> {
// let searchQuery = {
//       weatherBitURL: process.env.WEATHERIBT_URL,
//       params:{
//             key : process.env.WEATHERIBT_KEY,
//             lat : request.query.lat,
//             lon : request.query.lon,
//             query:

//       }
// }

// })

const PORT = process.env.PORT || 3020;
cityexplorer.listen(PORT, () => {
  console.log('running on PORT ' + PORT);
});
