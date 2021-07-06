'use strict';
 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./weather.json')
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/getWeather', getWeatherHandler)

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


function getWeatherHandler (req, res) {
    let sQuery = req.query.searchQuery;
    //let url = `https://api.weatherbit.io/v2.0/current?query=${sQuery}&key=${process.env.KEY}`

    axios
    .get(url)
    .then(weatherData=>{
        console.log(photoData.data)
        res.send(weatherData.data.results) 
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


server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})