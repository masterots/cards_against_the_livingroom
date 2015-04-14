var gulp = require('gulp');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

gulp.task('node:serve', function(){
  nodemon({
      script: 'build/server/index.js',
      ext: 'js',
      ignore: [
        'gulpfile.js',
        'gulp/**/*.*',
        'src/**/*.*',
        'node_modules/**/*.*',
        'build/public/app/app.js',
        'build/vendor/**/*.js'
      ]
    })
    .on('change', [])
    .on('restart', function () {
      console.log('restarted!');
    });
});
