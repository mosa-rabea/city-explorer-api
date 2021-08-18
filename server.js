const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cityexplorer = express();
cityexplorer.use(cors());

const weatherHandel = require('./controller/weather.controller');
const movieshandel = require('./controller/movie.controller');
cityexplorer.get('/', (request, response) => {
  response.send('Hello i am here , can you here Me ..');
});

cityexplorer.get('/weather', weatherHandel);

cityexplorer.get('/movies', movieshandel);

const PORT = process.env.PORT || 3020;
cityexplorer.listen(PORT, () => {
  console.log('running on PORT ' + PORT);
});
