'use strict';
 
const express = require('express');
// require('dotenv').config();
// const cros = require('cros');

const server = express();

// this work like a radio frequency
const PORT = 3001;
// localhost:3001/
server.get('/',(req,res)=>{
    res.status(200).send('is it work by now');
})






server.listen(PORT,()=>{
    console.log('is it work? yes it is.');
})