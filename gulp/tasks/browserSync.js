'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {

    browserSync.init({
        server: 'www'
    });

    gulp.watch(['src/index.html', 'src/assets/**/*'], ['reloadCopyFiles']);
    gulp.watch('src/**/*.scss', ['reloadStyles']);
});

gulp.task('reloadCopyFiles', ['copyFiles'], function(){
    browserSync.reload();
});

gulp.task('reloadStyles', ['styles'], function(){
    browserSync.reload();
});

module.exports = browserSync;