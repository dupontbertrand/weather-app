const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '********************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Oups, une erreur est survenue. Réessayez !'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Oups, une erreur est survenue. Réessayez !'});
      } else {
        let weatherText = `Il fait ${weather.main.temp} degrés à ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Weather app tourne sur le port 3000 ! :)')
})
