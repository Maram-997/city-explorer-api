'use strict';
 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./weather.json')
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/weather', getWeatherHandler)
server.get('/weather', getMoviesHandler)
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

function getMoviesHandler(req,res){
    let sQuery = req.query.searchQuery;
    let moviesUrl =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${sQuery}`
 axios
 .get(moviesUrl)
 .then(moviesData =>{ moviesUrl.data.results.map(element => {
     return new Movie (element.title , element.overview, element.average_votes, element.total_votes. element.image_url, element.popularity, element.released_onZ)
 }) 
     res.send(moviesData)
 })
}

// https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=3e950fccc65f477c92a03fccf5b5db9b&days=5

function getWeatherHandler (req, res) {
    let sQuery = req.query.searchQuery;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_KEY}&days=5`
    
    axios
    .get(url)
    .then(weatherData=>{ url.data.map(elemet => {
        return new Forecast (elemet.valid_date, elemet.weather.description)
    })
        res.send(weatherData) 
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
      constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on){
          this.title = title;
          this.overview = overview,
          this.average_votes = average_votes;
          this.total_votes = total_votes;
          this.image_url = `https://image.tmdb.org/t/p/w500${this.poster_path}`;
          this.popularity = popularity;
          this.released_on = release_date;
          
      }
  }

server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})