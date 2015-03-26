var appData = require('./package.json');
var express = require('express');
var path = require('path');
var exec = require('child_process').exec;
var _ = require('underscore');
var app = express();

var env = process.env.NODE_ENV || 'development';
var appEnvData = {
  version: appData.version,
  env: env
}
require("node-jsx").install();

var port = 8081;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res){
  res.render('index', appEnvData);
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.json({
    "route": "Sorry this page does not exist!"
  });
});

app.post('/payload', function(req, res){
  var body = req.body;

  if (body.commits.length){
    console.log('GITHUB : changes to repository detected');
    console.log('by : ', body.pusher.name);
    pullUpdates();

    function pullUpdates(){
      exec('git pull', function(err, stdout, stderr){
        if (!err){
          res.status(200).send(body);
          updateNpm();
        }
      });
    };

    function updateNpm(){
      // iterate to see changes in package.json
      var modified = _.pluck(body.commits, 'modified');
      var isUpdateNeed;

      modified.forEach(function(commit){
        commit.forEach(function(file){
          if (file === 'package.json'){
            isUpdateNeed = true;
          }
        });
      });
      if (isUpdateNeed) {
        exec('npm install', function(err, stdout, stderr){
          debugger;
        });
      }
    }
  }
})

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
