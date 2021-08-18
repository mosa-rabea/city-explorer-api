'use strict';

const axios = require('axios');
const Movies = require('../module/movies');

function movieshandel(req, res) {
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
}
module.exports = movieshandel;
