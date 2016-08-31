'use strict';

var gulp          = require('gulp');
var gutil         = require('gulp-util');
var gulpif        = require('gulp-if');
var watchify      = require('watchify');
var browserify    = require('browserify');
var stringify     = require('stringify');
var babelify      = require('babelify');
var sourcemaps    = require('gulp-sourcemaps');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var uglify        = require('gulp-uglify');
var eslint        = require('gulp-eslint');
var browserSync   = require('./browserSync');

var bundler;

gulp.task('javascript', ['lint'], function() {

    bundler = browserify({
            entries: 'src/main.js',
            debug: global.isDebug,
            paths: ['src/'],
            cache: {},
            packageCache: {},
            plugin: global.isDebug ? [watchify] : []
        })
        .transform(stringify, {
            appliesTo: {includeExtensions: ['.html']},
            minify: true
        })
        .transform(babelify, {
            presets: ['es2015']
        });

    if(global.isDebug) {
        bundler.on('update', javascript);
        bundler.on('update', lint);
    }

    return javascript();
});

gulp.task('lint', function() {
    return lint();
});


function javascript() {
    return bundler
        .bundle()
        .on('error', function(error) {
            gutil.log(gutil.colors.red(error));
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(global.isDebug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!global.isDebug, uglify()))
        .pipe(gulpif(global.isDebug, sourcemaps.write())) // '.' for external file
        .pipe(gulp.dest('www'))
        .pipe(gulpif(global.isDebug, browserSync.stream({once: true})));
}

function lint() {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
}