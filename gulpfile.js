const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

function styles() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass ({ outputStyle: 'compressed' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
}

exports.default = styles;

exports.watch = function() {
  gulp.watch('./src/scss/**/*.scss', styles);
};