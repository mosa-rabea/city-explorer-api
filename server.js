const express = require('express')
const CORS = require('cors')
const jsondata = require('./data/weather.json')
require('dotenv').config()

const cityexplorer = express()
cityexplorer.use(CORS())

// Method >> ('end point',callback)
cityexplorer.get('/', (request,response)=> {
      response.send('Hello i am here , can you here Me ..')})

      

const PORT = process.env.PORT || 3020
cityexplorer.listen(PORT,() => {console.log('running on PORT ' + PORT)})

