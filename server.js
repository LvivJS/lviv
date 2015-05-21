var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var jade = require('jade');
var files = require('./app/scripts/db_connector.js');
var ci = require('./simpleCI');

var port = process.env.port || 8080;
var env = process.env.NODE_ENV || 'development';
// utilities
app.locals.moment = require('moment');
var data = {};

data.config = require('./app/scripts/config.js');
data.footer = require('./app/locales/en/footer.json');
data.menu_socials = require('./app/locales/en/menu_socials.json');
data.moment = app.locals.moment;
data.connect = JSON.stringify(require('./app/scripts/db_connector.js'));

//get data only for (isRendering == true) modules
data.config.modules.forEach(function(module) {
  if (module.isRendering) {
    var mod = module.component;
    var path = './app/locales/en/' + mod + '.json';
    data[mod] = require(path);
  }
});

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
// listens to payloads from github
app.use('/github-payload', ci);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
  res.render('index', data);
});

//handle data from form
// todo: should be POST to "/users"
app.post('/', function(req, res, next) {
  files.push('users', req.body);
  res.status(200).send('Thanks for registration!');
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.status(404).send('Sorry this page does not exist!');
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
