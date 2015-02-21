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

// default
gulp.task('default', ['js_watch'], function () {
  gutil.log('Started successfully!')
});

// js
gulp.task('js_watch', function () {
  return gulp.watch('app/*.js', ['js_styleguide']);
});

// build
gulp.task('build', ['js_styleguide', 'browserify_build'], function () {
  notifier.notify({
    'title': 'gulp notification:',
    'message': 'BUILD SUCCESS'
  });
});

// code healthiness
gulp.task('js_styleguide', function () {
  return gulp.src(paths.jsFiles).pipe(jscs())
});

// BROWSERIFY
var bundler = watchify(browserify({
  entries: [paths.jsEntry],
  debug: env === 'development', // gives sourcemaps
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('browserify_build', browserify_bundle);
gulp.task('browserify_watch', function(){
  bundler.on('update', browserify_bundle);
  return bundler.bundle(); // needed too keep process running
});

bundler.on('time', function(time){
  gutil.log('Browserify rebundle finished after '+ gutil.colors.magenta(time + ' ms'));
});

// TODO : exit process somehow
function browserify_bundle(){
  return bundler.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(paths.buildFileName))
  .pipe(gulpif(env === 'production', streamify(uglify())))
  .pipe(gulp.dest(paths.buildRoot));
}
