const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Compilar SCSS
function styles() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
}

// Minificar HTML
function html() {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('./dist'));
}

// Minificar JavaScript
function scripts() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}

// Otimizar imagens
function images() {
  return gulp
    .src('./src/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/images'));
}

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/*.html', html);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/images/**/*', images);
}

// Build completo
const build = gulp.parallel(styles, html, scripts, images);

// Exports
exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.images = images;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;