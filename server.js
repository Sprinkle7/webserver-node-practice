const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} ${req.ip}`;
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// Middleware
// app.use((req, res, next) => {
//   res.render('working.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs',{
    name: 'Allauddin'
  });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
      pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
      error: 'You are just in wrong page'
    });
});

app.listen(3000);
