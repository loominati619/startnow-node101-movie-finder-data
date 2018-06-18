const express = require('express');
const logger = require('morgan');
const axios = require('axios');

const app = express();

app.use(logger('dev'));

var cache = {
    url: '',
    data: ''
}

app.get('/', function (req, res) {
    var movieData = req.query.i;
    var movieTitle = req.query.t;
    console.log(movieData, movieTitle);
    if (movieData) {
        if (cache.url === movieData) {
            res.json(cache.data);
        } else {
            axios.get('http://www.omdbapi.com/?i=' +
                movieData +
                '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = movieData;
                    cache.data = response.data;
                    res.json(response.data);
                }).catch(err => res.status(200).send("WOOHOO"))
        }
    } else if (movieTitle) {
        if (cache.url === movieTitle) {
            res.json(cache.data);
        } else {
            var url = movieTitle.replace(' ', '%20');
            axios.get('http://www.omdbapi.com/?t=' +
                url +
                '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = movieTitle;
                    cache.data = response.data;
                    res.json(response.data);
                }).catch(err => res.status(200).send("WOOHOO"))
        }
    }
});


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;