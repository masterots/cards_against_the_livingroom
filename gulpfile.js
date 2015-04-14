var gulp = require('gulp');

require('./gulp/react-app');
require('./gulp/react-libs');
require('./gulp/node-app');
require('./gulp/watch');
require('./gulp/styles');
require('./gulp/node-serve');
require('./gulp/copy-files');

gulp.task('develop', [
  'react:libs',
  'react:app:develop',
  'sass:develop',
  'node:develop',
  'copy-public-files',
  'copy-server-files'
]);

gulp.task('deploy', [
  'react:libs',
  'react:app:deploy',
  'sass:deploy',
  'copy-public-files',
  'copy-server-files'
]);

gulp.task('default', ['develop'], function() {
  return gulp.start('node:serve', 'watch');
});
