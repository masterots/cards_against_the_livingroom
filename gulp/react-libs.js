var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var libs = [
  'babel/polyfill',
  'bunyan',
  'events',
  'flux',
  'http',
  'lodash',
  'object-assign',
  'react',
  'react-router',
  'request',
  'socket.io-client'
];

gulp.task('react:libs', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);

    libs.forEach(function(lib) {
      b.require(lib);
    });

    return b.bundle();
  });
  return gulp.src(['./gulp/noop.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./build/public/libs/'));
});

exports.libs = libs;
