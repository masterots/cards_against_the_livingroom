var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var libs = require('./react-libs').libs;

gulp.task('react:app:develop', function() {
  var bundler = browserify({
    entries: ['./src/public/js/home.js'],
    transform: [reactify, babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  libs.forEach(function(lib) {
    bundler.external(lib);
  });

  var watcher = watchify(bundler);

  return watcher
          .on('update', function() {
            var updateStart = Date.now();
            gutil.log('Updating app build');
            watcher
              .bundle()
              .pipe(source('app.js'))
              .pipe(gulp.dest('./build/public/js/'));
            gutil.log('Updated', (Date.now() - updateStart) + 'ms');
          })
          .bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest('./build/public/js/'));
});

gulp.task('react:app:deploy', function() {
  var b = browserify({
    entries: ['./src/public/app/app.react.js'],
    transform: [reactify, babelify]
  });

  libs.forEach(function(lib) {
    b.external(lib);
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    // .pipe(gzip({append: false}))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./build/public/app/'));
});
