'use strict';

const GulpClient = require('gulp');
const { watch, series, src, dest } = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));

const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');


function runSass() {
  return src('src/css/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCSS({
        compatibility: 'ie8'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/*.html')
    .pipe(dest('dist'))
}

function images() {
  return src('src/img/images/*')
  .pipe(dest('dist'))
}

function watchSass() {

  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  watch('src/*.html', html).on('change', browserSync.reload)
  watch('src/css/app.scss', runSass)
  watch('src/img/images/*', images)

}

exports.default = series(html, runSass, images, watchSass)
