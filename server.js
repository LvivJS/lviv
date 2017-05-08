var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var jade = require('jade');
var files = require('./app/scripts/db_connector.js');
var MobileDetect = require('mobile-detect');

var port = process.env.port || 3000;
var env = process.env.NODE_ENV || 'development';
var staticDir = 'static';
var isProd = env === 'production';

// utilities
app.locals.moment = require('moment');
var data = {};

data.config = require('./app/scripts/config.js');
data.footer = require('./app/locales/en/footer.json');
data.menu_socials = require('./app/locales/en/menu_socials.json');
data.moment = app.locals.moment;
data.connect = JSON.stringify(require('./app/scripts/db_connector.js'));

data.menuItms = [];
data.config.modules.forEach(function(module) {
  var mod = module.component;
  data[mod] = require('./app/locales/en/' + mod + '.json');
  var menuItem = { component: module.component.toLowerCase(), title: data[mod].title };
  if (module.isRendering) {
    data.menuItms.push(menuItem);
  }
});

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, staticDir)));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
  checkUserAgent(req, res, function() {
    return res.render('index', data);
  });
});

app.listen(port);
console.log(env.toUpperCase() + ' server is up and running at port : ' + port);

function checkUserAgent(req, res, next) {
  //add isDesktop variable to data passing to index.jade
  md = new MobileDetect(req.headers['user-agent']);
  data.isDesktop = !md.mobile();
  data.isIE9 = md.version('Trident') <= 6;
  return next();
}
