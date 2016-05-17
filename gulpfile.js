var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
  gulp.src('./application')
    .pipe(server({
      livereload: true,
      open: true,
      defaultFile: 'index.html'
    }));
});