var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    bourbon = require("node-bourbon").includePaths,
    neat = require("node-neat").includePaths,
    cssmin = require('gulp-cssmin'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    handlebars = require('gulp-compile-handlebars');

// auto prefix vendors
// var AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
// ];
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
  return gulp.src(['js-prod/main.js']) // <- add other js files in array
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
    .pipe(sass({
        includePaths: bourbon,
        includePaths: neat
      }))
	// .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(maps.write('../maps')) // source map for debugging
    .pipe(rename('app.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

gulp.task('minifyCss', ['compileSass'], function () {
    return gulp.src('css/app.css')
    .pipe(cssmin())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('css'));
});

var templateData = {
    blurb: 'OUTDOOR FESTIVAL OF DIGITAL ANIMATION AND ART DOWNTOWN DENVER SATURDAY SEPTEMBER 24TH',
    login: 'LOGIN',
    about: 'ABOUT',
    sched: 'SCHEDULE',
    aboutmenu: ['FESTIVAL', 'JURORS', 'TEAM', 'HISTORY', 'PRESS', 'SPONSORS', 'COMPETE'],
    schedmenu: ['SCREENINGS', 'EDUCATION', 'MAP'],
    sponsorlinks: [
        {url: '<a href="http://artsandvenuesdenver.com" target="_blank">',
        img:'<img src="images/logos/sponsor-logos-02.png">'},
        {url: '<a href="http://www.artsandvenuesdenver.com/venues/denver-performing-arts-complex/the-next-stage-unveiled" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-03.png">'},
        {url: '<a href="http://www.denverdigerati.com" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-04.png">'},
        {url: '<a href="http://www.denvertheatredistrict.com" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-05.png">'},
        {url: '<a href="http://www.ucdenver.edu/schools/cam/Pages/default.aspx" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-06.png">'},
        {url: '<a href="http://www.bonfils-stantonfoundation.org" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-07.png">'},
        {url: '<a href="http://www.orangebarrelmedia.com/" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-08.png">'},
        {url: '<a href="http://www.biennialoftheamericas.org/" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-09.png">'},
        {url: '<a href="http://www.weedenlaw.com/" target="_blank">',
        img: '<img src="images/logos/sponsor-logos-10.png">'}
    ]
}
gulp.task('handle', function () {
    return gulp.src('templates/layout.handlebars')
        .pipe(handlebars(templateData))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('./'));
});


//=======================================
// watch files for any changes
//=======================================
gulp.task('watchFiles', function(){

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/**/*.scss', ['compileSass'], browserSync.reload);
    gulp.watch('js/app.js', ['concatScripts'], browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('templates/**/*.handlebars', ['handle'], browserSync.reload);
});

//=======================================
// clean out old compiled pages
//=======================================
gulp.task('clean', function(){
    del(['dist', 'css', 'js', 'index.html']);
});

//=======================================
// build production dirrectory
//=======================================
gulp.task('build', ['minifyScripts', 'minifyCss', 'handle'], function(){
    return gulp.src(['css/app.min.css', 'js/app.min.js', 'index.html', 'images/**', 'fonts/**'], { base: './' })
    .pipe(gulp.dest('dist'))
});


gulp.task('serve', ['watchFiles']);


// default task!
gulp.task('default', ['clean'], function(){
    gulp.start('build');
});
