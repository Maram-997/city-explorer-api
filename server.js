'use strict';
 
const express = require('express');
require('dotenv').config();
const cros = require('cros');
const server = express();
const weatherData = require('./weather.json')
const PORT = process.env.PORT;
server.use(cros());



server.get('/',(req,res) =>{
    res.status(200).send('Does it work?')
})
server.get('/weather',(req,res)=>{
    let selectedCity = weatherData.data.find(element  )
})






server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})