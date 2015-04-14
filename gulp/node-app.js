var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');

gulp.task('node:develop', function(){
  gulp.src('src/server/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(babel())
    .pipe(gulp.dest('build/server/'));
});
