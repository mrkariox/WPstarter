'use strict';


var browserSyncWatchFiles = [
    './style.css',
    './js/*.js',
    './**/*.php'
];


// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    proxy: "http://192.168.5.155/wpstarter/",
    notify: false
};


var jsDist = './js/';
var gulp = require('gulp');
var sass = require('gulp-sass');
//var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

gulp.task('sass', function() {
	gulp.src('./sass/style.scss')
	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/styleNoPref/'));
});


var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefixer', function() {
    gulp.src('./css/styleNoPref/style.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'))
});

// gulp.task('scripts', function(){
// 	gulp.src([ jsDist + 'owl.carousel.min.js', jsDist + 'navigation.js', jsDist + 'skip-link-focus-fix.js', jsDist + 'bootstrap.js', jsDist + 'app.js'])
// 	.pipe(concat('concated-js.js'))
// 	.pipe(gulp.dest('./js/'));
// });

gulp.task('sass:watch', ['browser-sync'], function () {
	gulp.watch('./sass/**/**/*.scss', ['sass']);
    // gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./css/styleNoPref/*.css', ['prefixer']);
});