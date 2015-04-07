var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.port || 8080;
var env = process.env.NODE_ENV || 'development';

// mocked data
var data = {};
data.footer = require('./app/locales/en/footer.json');
data.config = require('./app/scripts/config');

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res){
  res.render('index', data);
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.status(404).send("Sorry this page does not exist!");
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
