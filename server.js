'use strict';
 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./weather.json')
const axios = require('axios');
const server = express();
const PORT = process.env.PORT;
const getWeatherHandler = require('./weather');
const getMoviesHandler = require('./movies');

server.use(cors());






 server.get('/weather', getWeatherHandler)
server.get('/movie', getMoviesHandler)
// http://localhost:3001/weather?cityName=Amman
// server.get('/weather',(req,res)=>{
//     let selectedCity = weatherData.find(element =>{
//         if(element.city_name == req.query.cityName){
//             return element
//         }

//     })
//     let chosenCity = selectedCity.data.map(days => {
//         return(
//             new Forecast (days.valid_date , days.weather.description)
//         )
//     })
//     res.status(200).send(chosenCity);
// })


// Movies URL
 // https://api.themoviedb.org/3/search/movie?api_key=baba718b7f864fb52e546cdd76bb4f65&query=Action
// http://localhost:3001/movie?cityName=Amman



 


server.get('*',(req,res) =>{
    res.status(404).send('Unable to reach out :(')
})

 
 
server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})