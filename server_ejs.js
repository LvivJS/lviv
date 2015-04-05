var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var port = 8080;
var env = process.env.NODE_ENV || 'development';

// mocked data
var data = {}
data.footer = require('./app/locales/en/footer.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res){
  res.render('index_ejs', data);
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.status(404).send("Sorry this page does not exist!");
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
