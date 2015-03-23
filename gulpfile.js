var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./src/public/stylesheets/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./build/public/stylesheets'));
});

gulp.task('copy-server-files', function(){
  gulp.src('./src/server/**/*.ejs')
    .pipe(plumber())
    .pipe(gulp.dest('./build/server/'));
});

gulp.task('copy-images', function(){
  gulp.src('./src/public/images/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/public/images/'));
});

gulp.task('copy-vendor-files', function(){
  gulp.src('./src/public/vendor/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/public/vendor/'));
});

gulp.task('copy-public-files', ['copy-images', 'copy-vendor-files']);

gulp.task('server-js', function(){
  gulp.src('./src/server/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(babel())
    .pipe(gulp.dest('./build/server/'));
});

gulp.task('run-server', function(){
  nodemon({ script: './build/server/index.js', ext: 'js', ignore: ['./src/**/*.*', './build/public/**/*.*'] })
    .on('change', [])
    .on('restart', function () {
      console.log('restarted!')
    });
});

gulp.task('watch', function(){
  gulp.watch('./src/server/**/*.js', ['server-js']);
  gulp.watch('./src/server/**/*.ejs', ['copy-server-files']);
  gulp.watch(['./src/public/vendor/**/*.*', './src/public/images/**/*.*'], ['copy-public-files']);
  gulp.watch(['./src/public/stylesheets/**/*.scss'], ['sass']);

  var watcher  = watchify(browserify({
    entries: ['./src/public/js/home.js','./src/public/js/player.js','./src/public/js/host.js'],
    transform: [reactify, babelify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/public/js/'))
    console.log('Updated');
  })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/public/js/'));
});

gulp.task('default', ['copy-public-files', 'copy-server-files', 'sass', 'server-js', 'watch', 'run-server']);