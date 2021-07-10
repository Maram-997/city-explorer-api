'use strict';
const axios = require('axios');
 



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


class Forecast {
    constructor(date, description){
        this.date= date;
        this.description = description;
    }
}

module.exports = getWeatherHandler;
