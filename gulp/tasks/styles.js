'use strict';

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var gulpif     = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var sass       = require('gulp-sass');

gulp.task('styles', function() {

    return gulp.src('src/main.scss')
        .pipe(gulpif(global.isDebug, sourcemaps.init({loadMaps: true})))
        .pipe(sass({outputStyle: global.isDebug ? 'expanded' : 'compressed'})
        .on('error', function(error) {
            gutil.log(gutil.colors.red(error));
            this.emit('end');
        }))
        .pipe(gulpif(global.isDebug, sourcemaps.write()))
        .pipe(gulp.dest('www'));
});