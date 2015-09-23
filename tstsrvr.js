var express = require('express');
var hbs = require('express-hbs');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
var server = app.listen(3000, function () {
    console.log('App started');
});

app.get('/', function(req, res) {
  res.send('hello world');
});