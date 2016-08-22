'use strict';

var fs   = require('fs');
var gulp = require('gulp');

fs.readdirSync('./gulp/tasks/').forEach(function(task) {
    require('./tasks/' + task);
});

gulp.task('default', ['develop']);