'use strict';
 
const express = require('express');
require('dotenv').config();
const cros = require('cros');
const server = express();
const weatherData = require('./weather.json')
const PORT = process.env.PORT;
server.use(cros());


//localhost:3001weather?cityName=Amman
server.get('/weather',(req,res)=>{
    let selectedCity = weatherData.data.find(element =>{
        if(element.city_name == req.query.cityName){
            return element
        }
    })
    res.status(200).send(selectedCity);

})


server.get('*',(req,res) =>{
    res.status(404).send('Unable to reach out :(')
})



server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})