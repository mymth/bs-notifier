var del = require('del'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify');

gulp.task('jshint', function() {
    return gulp.src('./js/bs-notifier.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', ['jshint'], function() {
    return gulp.src('./js/bs-notifier.js')
		.pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('./js/'));
});

gulp.task('css', function() {
	var destination = './css/';

	return sass('./sass/bs-notifier.scss', { precision: 10 })
		.on('error', function (err) {
			console.error('Error', err.message);
		})
		.pipe(gulp.dest(destination))
		.pipe(minifyCSS())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(destination));
});

gulp.task('clean', function(cb) {
    del(['.js/*.min.js', './css/*.css'], cb);
});

gulp.task('default', ['js', 'css']);