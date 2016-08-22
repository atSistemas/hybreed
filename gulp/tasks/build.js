'use strict';

var gulp        = require('gulp');
var del         = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['www/**', '!www', '!www/.gitkeep']);
});

gulp.task('build', function(callback) {
    return runSequence('clean', ['javascript', 'styles', 'copyFiles'], callback);
});