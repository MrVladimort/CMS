const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const SCSS_SRC = './src/assets/scss/**/*.scss';
const CSS_DEST = './src/assets/css';

gulp.task('compile_scss', function() {
    gulp.src(SCSS_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat('default.min.css'))
        .pipe(gulp.dest(CSS_DEST));
});

gulp.task('watch_scss', function () {
    gulp.watch(SCSS_SRC, ['compile_scss'])
});

gulp.task('default', ['watch_scss']);
