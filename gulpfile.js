let { gulp, src, dest, series, watch, task } = require('gulp');
let concat = require('gulp-concat');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let nested = require('postcss-nested');
let rfs = require('rfs');
let rename = require('gulp-rename');
let bs = require('browser-sync');
let  postcssCustomMedia = require('postcss-custom-media');
let  postcssMinMax = require('postcss-media-minmax');

let SORSA = {
  css: [
    './assets/css/utils/fonts.css',
    './assets/css/utils/breakpoints.css',
    './assets/css/main.css',
  ],
  bundled: './assets/css/bundle/bundled.css'
};
//gulp.task('bundling',
const bundling = () => {
  return src(SORSA.css)
    .pipe(concat('bundled.css'))
    .pipe(dest('assets/css/bundle'));
  };

//gulp.task('postcss',
const postcsscomp = () => {
  return src(SORSA.bundled)
      .pipe(postcss([
                    rfs,
                    nested,
                    autoprefixer,
                    postcssCustomMedia,
                    postcssMinMax
                    ]))
      .pipe(rename('styles.css'))
      .pipe(dest('styles'));
    };

function reload(done) {
  bs.reload();
  done();
};

task('watchcss', function () {
  watch('assets/css/*.css', series(bundling, postcsscomp, reload));
});

exports.default = series(bundling, postcsscomp);