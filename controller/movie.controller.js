'use strict';

const axios = require('axios');
const Movies = require('../module/movies');
const Cache = require('../module/Cache');

let cache = new Cache();
function movieshandel(req, res) {
  let movieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.city}`;
  console.log(req.query.city);
  let key = `movie-${req.query.city}`;
  let movieDataArr = [];

  if (cache[key]) {
    res.send(cache[key].data);
  } else {
    axios
      .get(movieUrl)
      .then((movieRes) => {
        movieRes.data.results.map((each) => {
          movieDataArr.push(new Movies(each));
        });
        cache[key]={};
        cache[key].timeStamp=Date.now();
        cache[key].data=movieDataArr;
        res.send(movieDataArr);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

}
module.exports = movieshandel;
