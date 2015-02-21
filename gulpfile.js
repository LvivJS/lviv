var gulp = require('gulp');
var jscs = require('gulp-jscs');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var env = process.env.NODE_ENV || 'development';

var paths = {};
paths.sourceRoot = './app/js';
paths.buildRoot  = './dist/js';
paths.jsFiles    = paths.sourceRoot + '/*.js';
paths.jsEntry    = paths.sourceRoot + '/main.js';
paths.buildFileName = 'bundle.js';

// code healthiness
gulp.task('js_styleguide', function () {
  return gulp.src(paths.jsFiles)
    .pipe(jscs())
});

// js
gulp.task('js_watch', function () {
  return gulp.watch('app/*.js', ['js_styleguide']);
});

// build
gulp.task('build', ['js_styleguide'], function () {
  notifier.notify({
    'title': 'gulp notification:',
    'message': 'BUILD SUCCESS'
  });
});

// browserify
gulp.task('browserify_watch', function () {
  var bundler = browserify({
    entries: [paths.jsEntry],
    debug: env === 'development', // gives sourcemaps
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function () {
      var updateStart = Date.now();
      gutil.log('Browserify rebundle started...');

      watcher.bundle()
        .pipe(source(paths.buildFileName))
        .pipe(gulp.dest(paths.buildRoot));

      gutil.log('Browserify rebundle finished after '+ gutil.colors.magenta((Date.now() - updateStart) + ' ms'));
    })
    .bundle()
    .pipe(source(paths.buildFileName))
    .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(gulp.dest(paths.buildRoot));
});

// default
gulp.task('default', ['js_watch', 'browserify_watch'], function () {
  gutil.log('Started successfully!')
});