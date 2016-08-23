var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
// need to work in flow
    handlebars = require('gulp-compile-handlebars'),
// end
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');




// auto prefix vendors
var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];
// configure jshint task
gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('stylish'));
});
//=======================================
// concat all .js
// js/main.js -> production/app.js
//=======================================
gulp.task('concatScripts', function(){
  return gulp.src(['js/main.js', 'js/map.js']) // <- add other js files in array
  //concats files to one file
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('../maps')) // source map for debugging
  .pipe(gulp.dest('js'))
});

//=======================================
// minify all .js
// production/app.js -> to production/app.min.js
//=======================================
gulp.task('minifyScripts', ['concatScripts'], function(){
  return gulp.src('js/app.js')
  // minifies code
  .pipe(uglify())
  // rename file to app.min.js
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'))
});

//=======================================
// sass -> css
//=======================================

gulp.task('compileSass', function(){
    return gulp.src('scss/**/*.scss')
    .pipe(maps.init())
    .pipe(sass())
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(maps.write('../maps')) // source map for debugging
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

gulp.task('minifyCss', ['compileSass'] function () {
    return gulp.src('css/app.css')
    .pipe(cssmin())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('css'));
});

//=======================================
// watch sass for any changes
//=======================================
gulp.task('watchFiles', function(){

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/**/*.scss', ['compileSass']);
    gulp.watch('production/app.js', ['concatScripts'], browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);

});

//=======================================
// clean out old compiled pages
//=======================================
gulp.task('clean', function(){
    del(['dist', 'css', 'production']);
});

//=======================================
// build production dirrectory
//=======================================
gulp.task('build', ['minifyScripts', 'minifyCss'], function(){
    return gulp.src(['css/app.min.css', 'js/app.min.js', 'index.html', 'images/**', 'fonts/**'], { base: './' })
    .pipe(gulp.dest('dist'))
});


gulp.task('serve', ['watchFiles']);


// default task!
gulp.task('default', ['clean'], function(){
    gulp.start('build');
});
