var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('sass:develop', function() {
  gulp.src('./src/public/stylesheets/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .on('error', function(err) {
    console.log(err);
    this.end();
  })
  .pipe(gulp.dest('./build/public/stylesheets'));
});

gulp.task('sass:deploy', function() {
  gulp.src('./src/public/sass/*.scss')
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(rename(function(path) {
    path.basename = path.basename + '.min';
  }))
  .on('error', function(err) {
    console.log(err);
    this.end();
  })
  .pipe(gulp.dest('./build/public/stylesheets'));
});
