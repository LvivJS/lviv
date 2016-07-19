var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var jade = require('jade');
var files = require('./app/scripts/db_connector.js');
var ci = require('./simpleCI');
var fs = require('fs');
var MobileDetect = require('mobile-detect');

var port = process.env.port || 3001;
var env = process.env.NODE_ENV || 'development';
var staticDir = env == 'development' ? 'dist' : 'static';
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

//get data for modules
data.config.modules.forEach(function(module) {
  var mod = module.component;
  var path = './app/locales/en/' + mod + '.json';
  data[mod] = require(path);
  var menuItem = {
    component: module.component.toLowerCase(),
    title: data[mod].title
  };
  if (module.isRendering) {
    data.menuItms.push(menuItem);
  }
});

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, staticDir)));
// listens to payloads from github
app.use('/github-payload', ci);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
  checkUserAgent(req, res, function() {
    return res.render('index', data);
  });
});

//register bad bots
// app.get('/nolink', function(req, res, next) {
//   var usrAgnt = req.get('User-Agent');
//
//   var blackList = require('./dist/locales/badBots.json');
//   blackList.push({name: usrAgnt});
//   fs.writeFile('./dist/locales/badBots.json', JSON.stringify(blackList), function (err) {
//     if (err) {
//       throw err;
//     }
//     console.log('Bad bot list has been updated!');
//   });
//   checkUserAgent(req, res, function() {});
// });

//handle data from form
// todo: should be POST to "/users"
// app.post('/', function(req, res, next) {
//   files.push('users', req.body);
//   res.status(200).send('Thanks for registration!');
// });
//
// //Route not found -- Set 404
// app.get('*', function(req, res) {
//   checkUserAgent(req, res, function() {
//     return res.status(404).send('Sorry this page does not exist!');
//   });
// });

app.listen(port);
console.log(env.toUpperCase() + ' server is up and running at port : ' + port);

function checkUserAgent(req, res, next) {
  //add isDesktop variable to data passing to index.jade
  md = new MobileDetect(req.headers['user-agent']);
  data.isDesktop = !md.mobile();
  data.isIE9 = md.version('Trident') <= 6;

  var usrAgnt = req.get('User-Agent');
  var blackList = require('./app/locales/badBots.json');;
  var isInList = false;

  for (var i = blackList.length - 1; i >= 0; i--) {
    isInList = blackList[i].name === usrAgnt ? true : false;
    if (isInList) {
      return res.status(200).send('Access denied!');
    }
  }
  return next();
}
