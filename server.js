'use strict';
 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./weather.json')
const axios = require('axios');
const server = express();
const PORT = process.env.PORT;
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
function getMoviesHandler(req,res){
    let sQuery = req.query.cityName;
    let moviesUrl =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${sQuery}`
 axios
 .get(moviesUrl)
 .then(moviesData =>{
     let selectedMovie = moviesData.data.results.map(movie => {
         return new Movie (movie)
     })
     res.send(selectedMovie)
 }) 
   
  
}


// https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=3e950fccc65f477c92a03fccf5b5db9b&days=5


// http://localhost:3001/weather?cityName=Amman
function getWeatherHandler (req, res) {
    let sQuery = req.query.cityName;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_KEY}&days=5`
    
    axios
    .get(url)
    .then(weatherData=>{
        let selectedCity = weatherData.data.data.map(day => {
            return new Forecast (day.valid_date, day.weather.description)
        })  
        res.send(selectedCity) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })


}


 


server.get('*',(req,res) =>{
    res.status(404).send('Unable to reach out :(')
})
 class Forecast {
     constructor(date, description){
         this.date= date;
         this.description = description;
     }
 }
 
  class Movie {
      constructor(movie){
          this.title = movie.title;
          this.overview = movie.overview,
          this.vote_average = movie.vote_average;
          this.vote_count = movie.vote_count;
          this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          this.popularity = movie.popularity;
          this.released_on = movie.release_date;
          
      }
  }

server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})