'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('nodemon');
const plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// COMPILE SASS
gulp.task('compile-sass', () => {
    gulp.src('server/sass/style.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('public/css/'));
});

// NODEMON
gulp.task('nodemon', function (cb) {
	let isServerStarted = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', () => {
		if (!isServerStarted) {
			cb();

			isServerStarted = true; 
		} 
	});
});

// BROWSER SYNC
gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["server/**/*.*"],
        browser: "google chrome",
        port: 5000,
	});
});

// WATCH
gulp.task('watch', () => {
    gulp.watch('server/sass/**/*.scss', ['compile-sass']);
});

// DEFAULT
gulp.task('default', ['browser-sync', 'watch']);