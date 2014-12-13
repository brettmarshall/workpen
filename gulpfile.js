var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('builds/development/js/**/*')
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
});

gulp.task('sass', function () {
    gulp.src('builds/development/sass/**/*')
        .pipe(sass())
        .pipe(gulp.dest('builds/development/css'));
});

gulp.task('css', function() {
  gulp.src('builds/development/css/*.css')
});

gulp.task('autoprefixer', function () {
    gulp.src('builds/development/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch('builds/development/css/*.css', ['css']);
  gulp.watch('builds/development/css/*.css', ['autoprefixer']);
  gulp.watch('builds/development/sass/**/*', ['sass']);
  gulp.watch(['builds/development/*.html',
    'builds/development/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true,
      host: "workpen.dev"
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'css', 'autoprefixer', 'webserver']);
