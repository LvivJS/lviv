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

var paths = {};
paths.sourceRoot = './app';
paths.buildRoot  = './dist';
paths.jsFiles    = paths.sourceRoot + '/*.js';
paths.jsEntry    = paths.sourceRoot + '/main.js';
paths.buildFileName = 'bundle.js';
paths.sassFiles  = paths.sourceRoot + '/sass/*.scss';
paths.styles = '/style';
paths.buildDevStyles = paths.buildRoot + '/dev' + paths.styles;
paths.buildProdStyles = paths.buildRoot + '/prod' + paths.styles;

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
    debug: true, // gives sourcemaps
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
    .pipe(gulp.dest(paths.buildRoot));
});

//sass
gulp.task('dev_styles', function() {
  return gulp.src(paths.sassFiles)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concating('style.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.buildDevStyles))

});

gulp.task('prod_styles', function() {
  return gulp.src(paths.sassFiles)
  .pipe(sass())
  .pipe(concating('style.css'))
  .pipe(minifycss())
  .pipe(gulp.dest(paths.buildProdStyles))
});

gulp.task('styles_watch', function(){
  return gulp.watch(paths.sassFiles,['dev_styles'])
});


// default
gulp.task('default', ['js_watch', 'browserify_watch', 'styles_watch'], function () {
  gutil.log('Started successfully!')
});