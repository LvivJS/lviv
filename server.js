var appData = require('./package.json');
var express = require('express');
var compress = require('compression');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var ci = require('./simpleCI');
var fs = require('fs');
var zlib = require('zlib');


var port = process.env.port || 8080;
var env = process.env.NODE_ENV || 'development';

var appEnvData = {
  version: appData.version,
  env: env
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('views/index.html'));
// listens to payloads from github
app.use('/github-payload', ci);

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
    // res.render('index', appEnvData, function(err, html) {
    //   // res.setHeader('content-type', 'text/html');
    //   // res.status(200).send(zlib.Gzip(html));
    //
    //   res.status(200).send(html);
    // });
    res.writeHead(200, { 'content-encoding': 'gzip', 'content-type': 'text/html' })
    var output = fs.createReadStream('views/index.html')
      .pipe(zlib.createGzip())
      .pipe(res);

    // var temp = output.pipe(zlib.createGzip());
    // res.send(temp);
});

//Route not found -- Set 404
app.get('*', function(req, res) {

  res.status(404).send("Sorry this page does not exist!");
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
