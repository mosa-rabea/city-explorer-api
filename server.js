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

cityexplorer.get('/weather/lat/lon', getweatherData);
function getweatherData(request, response) {
  let url = `https://api.weatherbit.io/v2.0/subscription/usage?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHERIBT_KEY}`;
  let weatherData = [];
  axios
    .get(url)
    .then((weatherRes) => {
      weatherRes.data.data.map((day) => weatherData.push(new Weather(day)));
      response.send(weatherData);
    })
    .catch((error) => {
      response.status.send(error);
    });
}

class Weather {
  constructor(data) {
    this.date = data.datetime;
    this.description = data.weather.description;
  }
}

cityexplorer.get('/movies/city_name', (req, res) => {
  let movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.city_name}`;

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
