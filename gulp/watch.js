var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('watch', function() {
  //var reactApp = gulp.watch('src/public/**/*.js');
  //reactApp.on('change', function(event) {
  //  gulp.start('react:app:develop', function() {
  //    gutil.log(gutil.colors.green('Compiled React files...'));
  //  });
  //});

  var nodeApp = gulp.watch('src/server/**/*.js');
  nodeApp.on('change', function(event) {
    gulp.start('node:develop', function() {
      gutil.log(gutil.colors.green('Compiled Node files...'));
    });
  });

  var sass = gulp.watch('src/public/**/*.scss');
  sass.on('change', function(event) {
    gulp.start('sass:develop', function() {
      gutil.log(gutil.colors.green('Compiled  Sass files...'));
    });
  });

  var ejsFiles = gulp.watch('src/server/**/*.ejs');
  ejsFiles.on('change', function(event) {
    gulp.start('copy-server-files', function() {
      gutil.log(gutil.colors.green('Copied server files...'));
    });
  });

  var publicFiles = gulp.watch(['./src/public/vendor/**/*.*', './src/public/images/**/*.*']);
  publicFiles.on('change', function(event) {
    gulp.start('copy-public-files', function() {
      gutil.log(gutil.colors.green('Copied public files...'));
    });
  });

  gutil.log(gutil.colors.green('Watching for changes to React app...'));
  gutil.log(gutil.colors.green('Watching for changes to node app...'));
  gutil.log(gutil.colors.green('Watching for changes to sass files...'));
  gutil.log(gutil.colors.green('Watching for changes to ejs files...'));
  gutil.log(gutil.colors.green('Watching for changes to public files...'));
});
