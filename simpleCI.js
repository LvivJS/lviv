var exec = require('child_process').exec;
var fs =  require('fs');
var _ = require('underscore');
var Q = require('q');
// TODO : major refactor needed
var date_opts =  {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric'
};

var gulpmap = {
  'scripts': 'browserify_bundle',
  'styles' : 'build_style',
  'images' : 'build_image',
  'locales': 'json_move'
}

var gulptasks = [];

var headCommit;

function ci(req, res, next){
  var body = req.body;
  if (body.commits && body.commits.length){
    console.log(new Date().toLocaleString('en', date_opts), 'GITHUB : changes to repository detected by :', body.pusher.email);
    // what have to be done to ensure latest steady version on test
    // we return success status only if all steps passed
    Q.fcall(pullUpdates, body)
      .then(updateNpm)
      .then(rebuildApp)
      .then(function(data){
        res.status(200).send('[BUILD SUCCESS] :: \n' + data.log );
        console.log('res status 200 - Build success');
      }, function(err){
        res.status(500).send(err);
        console.log('Build failure :: \n', err);
      })
      .then(restartServer);
      // .then(updateAppEnvData)
  } else {
    res.status(501).send('What is that? no commits, meh :/')
  }
}

// functions to be run on git push notification
function pullUpdates(body){
  return new Promise(function(resolve, reject){
    exec('git pull', function(err, stdout, stderr){
      if (err){
        reject(err);
      } else {
        headCommit = JSON.stringify(_.pick(body.head_commit, 'message', 'timestamp', 'url', 'author'));
        resolve({ body: body, log: '[pullUpdates] :: \n' + stdout.trim() });
      }
      console.log('[pullUpdates] ::', stdout, stderr);
    });
  });
};
function updateNpm(data){
  return new Promise(function(resolve, reject){
    var modified = _.pluck(data.body.commits, 'modified');
    var isUpdateNeed;
    // iterate to look for changes in package.json
    modified.forEach(function(commit){
      commit.forEach(function(file){
        if (file === 'package.json'){
          isUpdateNeed = true;
        }
      });
    });
    // if found - update packages
    if (isUpdateNeed) {
      exec('npm install', function(err, stdout, stderr){
        if (err){
          reject(err)
        } else {
          resolve({ body: data.body, log: data.log + '\n[updateNpm] ::\n' + stdout });
        }
        console.log('[updateNpm] ::', stdout, stderr);
      });
    } else {
      console.log('[updateNpm] :: no need to update')
      resolve({ body: data.body, log: data.log+'\n[updateNpm] :: \nNo need to update' });
    }
  });
}

function rebuildApp(data){
  var changedFiles = _.uniq( _.flatten( data.body.commits.map(function(commit){
    return _.union(commit.added, commit.removed, commit.modified);
  })));

  var types = _.uniq( changedFiles.map(function(file){
    if (file.match(/\/[a-z]\w+\//)){
      // [1] returns group match in parenthesis
      return /\/([a-z]\w+)\//.exec(file)[1];
    }
  }));

  var tasks = types.map(function(type){
    return gulpmap[type];
  }).join(' ').trim();

  var gulpCommand = 'gulp ' + tasks;

  return new Promise(function(resolve, reject){
    if ( tasks ){
      exec(gulpCommand, function(err, stdout, stderr){
        if (err) {
          reject(err);
        } else {
          resolve({ body: data.body, log: data.log +'\n[rebuildApp] ::\n' + stdout });
        }
        console.log('[rebuildApp] :: \n', stdout, stderr);
      });
    } else {
      resolve({body: data.body, log: data.log + '\n[rebuildApp] ::\nNo need to rebuild'});
    }
  });
}

function restartServer(data){
  return new Promise(function(resolve, reject){
    exec('forever restart server.js', function(err, stdout, stderr){
      if(err) {
        reject(err);
      } else {
        resolve({body: data.body, log: data.log + '\n[restartServer] :: restarted server'})
      }
    });
  });
}

module.exports = ci;
