var gulp = require('gulp');
var plumber = require('gulp-plumber');

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

gulp.task('copy-fonts', function(){
  gulp.src('./src/public/fonts/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/public/fonts/'));
});

gulp.task('copy-vendor-files', function(){
  gulp.src('./src/public/vendor/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/public/vendor/'));
});

gulp.task('copy-public-files', ['copy-images', 'copy-fonts', 'copy-vendor-files']);
