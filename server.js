var express = require('express');
var path = require('path');
var app = express();
// Make sure to include the JSX transpiler
require("node-jsx").install();

var port = 4444;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));


// index url
app.get('/', function(req, res){
  res.render('index');
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.json({
      "route": "Sorry this page does not exist!"
  });
});

app.listen(port);

console.log('Server is Up and Running at Port : ' + port);
