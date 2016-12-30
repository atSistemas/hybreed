var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    babel = require('babel-register'),
    istanbul = require('gulp-istanbul'),
    isparta = require('isparta'),

    exec = require('gulp-exec'),
    del = require('del'),
    coverageEnforcer = require('gulp-istanbul-enforcer');


var paths = {
  scripts:  ['src/**/*.js'],
  tests:    ['test/**/*.spec.js'],
  coverage: 'coverage/'
};

// Import dom util to avoid errors about window, navigator... not found
var dom = require('../../test/utils/dom');


// INTERNAL TASKS
//
gulp.task('clean-coverage', function(cb) {
    return del(['coverage'], cb);
});


// TASKS
//
gulp.task('test', function() {
    return gulp.src(paths.tests, {read:false})
        .pipe(mocha({
            compilers:babel,
            require:['jsdom-global/register']
        }));
});


gulp.task('testFromSource', function() {
    return gulp.src(['src/**/*.spec.js'])
        .pipe(mocha({
            compilers:babel,
            require:['jsdom-global/register']
        }))
        .pipe(istanbul)
        .pipe(istanbul.writeReports());
});

gulp.task('tdd', function() {
    return gulp.watch([paths.scripts,paths.tests], ['test']);
});

gulp.task('tdd-single', function() {
    return gulp.watch(paths.tests)
        .on('change', function(file) {
            gulp.src(file.path)
                .pipe(mocha({
                    compilers: babel,
                    require:['jsdom-global/register']
                }))
        });
});



gulp.task('test-coverage', ['clean-coverage'], function(cb) {
    var coverageDir = paths.coverage;
    gulp.src(paths.scripts)
        .pipe(istanbul({ // Covering files
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function() {
            gulp.src(paths.tests, {read: false})
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: coverageDir,
                    reportOpts: {dir: coverageDir},
                    reporters: ['text', 'text-summary', 'json', 'html']
                }))
                .pipe(coverageEnforcer({
                    thresholds: {
                        statements: 80,
                        branches: 50,
                        lines: 80,
                        functions: 50
                    },
                    coverageDirectory: coverageDir,
                    rootDirectory : ''
                }))
                .on('end', cb);
        });
});
