var gulp = require('gulp');
var jscs = require('gulp-jscs');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var concating = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var livereload = require('live-reload');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var deleteDist = require('del');
var reactify = require('reactify');

var env = process.env.NODE_ENV || 'development';
var slash = new RegExp('/', 'g');

var paths = {};

paths.sourceRoot = './app/scripts';
paths.jsFiles    = paths.sourceRoot + '/*.js';
paths.jsEntry    = paths.sourceRoot + '/main.js';
paths.buildFileName = 'bundle.js';
paths.sassFiles  = './app/styles/*.scss';
paths.styles = '/style';
paths.script = '/scripts';
paths.buildDev = './dist/dev';
paths.buildProd = './dist/prod';

// default
gulp.task('default', ['js_watch', 'style_watch'], function () {
  gutil.log('Started successfully!')
});

// js
gulp.task('js_watch', function () {
  return gulp.watch('app/*.js', ['js_styleguide']);
});

gulp.task('style_watch', function(){
  return gulp.watch(paths.sassFiles,['build_style'])
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
  debug: env === 'development', // gives sourcemaps for development environment
  cache: {},
  packageCache: {},
  fullPaths: true
}).transform(reactify));

gulp.task('browserify_build', browserify_bundle);
gulp.task('browserify_watch', function(){
  bundler.on('update', browserify_bundle);
  return bundler.bundle(); // needed too keep process running
});

bundler.on('time', function(time){
  gutil.log('Browserify rebundle finished after '+ gutil.colors.magenta(time + ' ms'));
});

//sass
gulp.task('build_style', function() {
  return gulp.src(paths.sassFiles)
  .pipe(gulpif(env === 'development', sourcemaps.init()))
  .pipe(sass())
  .pipe(concating('styles.css'))
  .pipe(gulpif(env === 'development', sourcemaps.write()))
  .pipe(gulpif(env === 'development', gulp.dest(paths.buildDev + paths.styles)))
  .pipe(gulpif(env === 'production', minifycss()))
  .pipe(gulpif(env === 'production', gulp.dest(paths.buildProd + paths.styles)))
});

// TODO : exit process somehow
function browserify_bundle(){
  return bundler.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(paths.buildFileName))
  .pipe(gulpif(env === 'production', streamify(uglify())))
  .pipe(gulpif(env === 'production', gulp.dest(paths.buildProd + paths.script)))
  .pipe(gulpif(env === 'development', gulp.dest(paths.buildDev + paths.script)));
}

//start server
gulp.task('start_server', shell.task(['node server.js']));

//livereload
gulp.task('livereload_start', shell.task(['live-reload --port 9091 dist/']));


//creeate folders for browserify if not exist
gulp.task('browserify_make_dir', shell.task([
  'if not exist ' + paths.buildDev.replace(slash, '\\') + paths.script.replace(slash, '\\') + ' mkdir ' + paths.buildDev.replace(slash, '\\') + paths.script.replace(slash, '\\'),
  'if not exist ' + paths.buildProd.replace(slash, '\\') + paths.script.replace(slash, '\\') + ' mkdir ' + paths.buildProd.replace(slash, '\\') + paths.script.replace(slash, '\\')
  ]));

//clean folders
gulp.task('deleteDist', function() {
  deleteDist(['./dist/dev/*', './dist/prod/*'], function() {
    gutil.log('dev and prod folders cleaned');
  });
});

//create folders and files before starting serve
gulp.task('build', function() {
  runSequence([
    'deleteDist',
    'browserify_make_dir',
    'build_style',
    'browserify_build'
  ]);
  gutil.log('files builded');
});

//run browserify, start server and reload page on saving changes
gulp.task('serve', ['browserify_watch', 'style_watch', 'start_server', 'livereload_start'], function() {
  gutil.log('Started successfully!');
});
