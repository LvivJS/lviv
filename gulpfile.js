'use strict';

var gulp = require('gulp');
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
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var del = require('del');
var reactify = require('reactify');
var imagemin = require('gulp-imagemin');
var jsxcs = require('gulp-jsxcs');
var autoprefixer = require('gulp-autoprefixer');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var paths = {};
paths.sourceRoot = './app/scripts';
paths.jsFiles = paths.sourceRoot + '/**/*.js';
paths.jsEntry = paths.sourceRoot + '/main.js';
paths.buildFileName = 'bundle.js';
paths.sassFiles = './app/styles/**/*.scss';
paths.imageFiles = './app/images/**/*';
paths.jsonFiles = './app/locales/**/*';
paths.styles = '/style';
paths.script = '/scripts';
paths.build = './dist';

// default
gulp.task('default', ['serve']);

//run browserify, start server and reload page on saving changes
var serveTasks = {
  'development': ['browserify_watch', 'app_watch', 'start_server', 'start_livereload', 'tunnel'],
  'production' : ['start_server']
}

gulp.task('serve', serveTasks[env],
  function() { gutil.log('Started successfully!');
});

//create folders and files before starting serve
gulp.task('build', function () {
  runSequence(
    'deleteDist',
    'scripts_styleguide',
    ['build_style', 'build_image', 'browserify_build', 'json_move'],
    notify_success);

  function notify_success(err){
    notifier.notify({
      title: 'GULP BUILD ' + (err ? 'FAILED' : 'SUCCESS'),
      message: err ? 'at ' + err.message : '✔ ' + env
   }, function(){
     //hack: exits process since browserify_build does not :(
     process.exit();
   });
  }
});

gulp.task('app_watch', function(){
  gulp.watch(paths.jsFiles, ['scripts_styleguide']);
  gulp.watch(paths.sassFiles, ['build_style']);
});

//STYLES
gulp.task('build_style', function() {
  return gulp.src(paths.sassFiles)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    // .pipe(autoprefixer({browsers: ['> 5%','last 2 versions']}))
    .pipe(concating('styles.css'))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, minifycss()))
    .pipe(gulp.dest(paths.build + paths.styles));
});

//IMAGES
gulp.task('build_image', function() {
  return gulp.src(paths.imageFiles)
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(paths.build + '/images'));
});

//TEMPORARY task for moving json folder form app into dist/dev
gulp.task('json_move', function() {
  return gulp.src(paths.jsonFiles)
      .pipe(gulp.dest(paths.build + '/locales'));
});

//code healthiness
gulp.task('scripts_styleguide', function () {
  return gulp.src(paths.jsFiles).pipe(jsxcs());
});

//BROWSERIFY
var bundler = watchify(browserify({
  entries: [paths.jsEntry],
  debug: !isProd, // gives sourcemaps for development environment
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

// TODO : exit process somehow
function browserify_bundle(){
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.buildFileName))
    .pipe(gulpif(isProd, streamify(uglify())))
    .pipe(gulp.dest(paths.build + paths.script));
}

//start server
gulp.task('start_server', shell.task(['node server.js']));

//tunnel your localhost to web
gulp.task('tunnel', shell.task(['lt --port 8080']));

//livereload
gulp.task('start_livereload', shell.task(['live-reload --port 9091 dist/']));

//clean folders
gulp.task('deleteDist', function() {
  del(paths.build);
});
