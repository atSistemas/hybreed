'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


gulp.task('browserSyncTests', function() {

  browserSync.init({
    server: 'tests',
    notify: false
  });

});

gulp.task('testHtml', function(callback) {
  runSequence('browserSyncTests', callback);
});