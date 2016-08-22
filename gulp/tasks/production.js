'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('setDebugFalse', function() {
    global.isDebug = false;
});

gulp.task('production', function(callback) {
    runSequence('setDebugFalse', 'build', callback);
});