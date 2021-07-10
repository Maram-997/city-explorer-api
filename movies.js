'use strict';
const axios = require('axios');


let inMemory= {};

function getMoviesHandler(req,res){
    let sQuery = req.query.cityName;
    let moviesUrl =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${sQuery}`
 
 if(inMemory[sQuery] !== undefined){
     res.status(200).send(inMemory[sQuery]);
 } else{
    axios
    .get(moviesUrl)
    .then(moviesData =>{
        let selectedMovie = moviesData.data.results.map(movie => {
            return new Movie (movie)
        })
        inMemory[sQuery] = selectedMovie;
        res.status(200).send(selectedMovie)
    }) 
      




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

module.exports = getMoviesHandler;