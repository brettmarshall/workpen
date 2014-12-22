var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  rename = require("gulp-rename"),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  minify = require('gulp-minify');

gulp.task('js', function() {
  gulp.src([
    'builds/development/js/lib/jquery/dist/jquery.min.js',
    'builds/development/js/lib/angular/angular.min.js',
    'builds/development/js/lib/angular-route/angular-route.min.js',
    'builds/development/js/lib/angular-animate/angular-animate.min.js',
    'builds/development/js/lib/firebase/firebase.js',
    'builds/development/js/lib/angularfire/dist/angularfire.min.js',
    'builds/development/js/lib/angular-md5/angular-md5.min.js',
    'builds/development/js/lib/fastclick/lib/fastclick.js',
    'builds/development/js/lib/angular-resource/angular-resource.min.js',
    'builds/development/js/lib/angular-file.js'
  ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('builds/development/js'))      
});

gulp.task('footer_js', function() {
  gulp.src([
    'builds/development/js/app.js',
    'builds/development/js/controllers/user-controller.js',
    'builds/development/js/controllers/login-controller.js',
    'builds/development/js/controllers/register-controller.js',
    'builds/development/js/controllers/list-controller.js',
    'builds/development/js/controllers/upload-controller.js',
    'builds/development/js/directives/nav-directive.js',
    'builds/development/js/directives/task-filter-directive.js',
    'builds/development/js/directives/nav-open-directive.js'
  ])
    .pipe(concat('footer.js'))
    .pipe(gulp.dest('builds/development/js'))  
});

gulp.task('compress', function() {
  gulp.src('builds/development/js')
    .pipe(minify({
        exclude: ['lib', 'controllers', 'directives'],
        ignoreFiles: ['app.js', '-min.js']
    }))
    .pipe(gulp.dest('.'))
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
});

gulp.task('sass', function () {
  gulp.src('builds/development/sass/**/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js', 'footer_js', 'compress']);
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

gulp.task('default', ['watch', 'html', 'js', 'footer_js', 'compress', 'sass', 'webserver']);
