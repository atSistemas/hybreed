'use strict';

var gulp = require('gulp');

gulp.task('copyFiles', ['copyIndex', 'copyFonts']);

gulp.task('copyIndex', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('www'));
});

gulp.task('copyFonts', function() {
    return gulp.src('src/fonts/**/*.ttf')
        .pipe(gulp.dest('www/fonts'));
});