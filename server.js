const express = require('express')
const CORS = require('cors')
const jsondata = require('./data/weather.json')
require('dotenv').config()

const cityexplorer = express()
cityexplorer.use(CORS())

// Method >> ('end point',callback)

      cityexplorer.get('/', (request,response)=> {
            response.send('Hello i am here , can you here Me ..')})
      
            cityexplorer.get('/weather', (request,response)=> {
                let data;
                data = jsondata.find((data) => 
                (data.lon === +request.query.lon && data.lat === +request.query.lat && data.city_name === request.query.city_name));
                if(data){
                      response.send(
                            data.data.map(data => new Weather(data) )
                      ) 
                  }else {
                        response.status(500).send('No Data Found')
                  } })
                    class Weather {
                      constructor(data){
                            this.date = data.valid_date,
                            this.description = data.weather.description
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
      
    

const PORT = process.env.PORT || 3020
cityexplorer.listen(PORT,() => {console.log('running on PORT ' + PORT)

})

