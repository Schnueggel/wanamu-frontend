'use strict';
/**
 * ######################################################################################
 * ######################################################################################
 * REQUIRE
 * ######################################################################################
 * ######################################################################################
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    open = require('gulp-open'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    path = require('path'),
    ngConstant = require('gulp-ng-constant'),
    karma = require('karma').server,
    fs = require('fs'),
    del = require('del');
/**
 * ######################################################################################
 * ######################################################################################
 * PATH VARS
 * ######################################################################################
 * ######################################################################################
 */
var srcPath = path.join(__dirname, 'src'),
    srcAppPath = path.join(srcPath, 'app'),
    srcStaticFolder = path.join(__dirname, 'src', 'static'),
    srcConfigPath = path.join(__dirname, 'src', 'config.json'),
    appscript = 'app.js',
    tmpPath = path.join(__dirname, 'tmp'),
    tmpAppPath = path.join(tmpPath, 'app'),
    tmpIndexHtml = path.join(tmpAppPath, 'index.html'),
    tmpConfigPath = path.join(tmpAppPath, 'services'),
    distPath = path.join(__dirname, 'dist'),
    distAppPath = path.join(distPath, 'app'),
    distIndexHtml = path.join(distAppPath, 'index.html'),
    env = process.APP_ENV || 'development',
    indexFileName = 'index.js';

/**
 * ######################################################################################
 * ######################################################################################
 * WEBPACK CONFIG
 * ######################################################################################
 * ######################################################################################
 */
var webpackConfig = {
    context: __dirname,
    entry: path.join(tmpAppPath, appscript),
    output: {
        path: distAppPath,
        filename: indexFileName.replace('.js','-' + Date.now() + '.js')
    },
    debug: false,
    devtool: '',
    module: {
        noParse: [
            /[\/\\]angular\.js$/,
            /[\/\\]angular-ui-router\.js$/,
            /[\/\\]angular-translate\.js$/,
            /[\/\\]angular-messages\.js$/
        ],
        loaders : [
            {
                test: /\.es6\.js$/,
                loader: 'babel'
            },
            {
                test: /\.ts$/,
                loaders: ['babel', 'typescript']
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?cascade=false&browsers=last 2 versions',
                    'sass?sourceMap=false'
                ]
            }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
};


/**
 * ######################################################################################
 * ######################################################################################
 * Main Tasks come here
 * ######################################################################################
 * ######################################################################################
 */
// ===================================================================
// Default task Builds the application. Just call gulp
// ===================================================================
gulp.task('default', ['build']);
// ===================================================================
// Build the application into the dist folder
// ===================================================================
gulp.task('build', function (cb) {
    runSequence('jshint', 'build-app', cb);
});

// ====================================================================
// Builds frontend and backend,
// starting the development.json server and opens a browser.
// ====================================================================
gulp.task('build-serve',  function (cb) {
    runSequence('build', 'connect', 'watch', 'http-browser', cb);
});

// ======================================================
// Test frontend and backend
// ======================================================
gulp.task('test', function (cb) {
    runSequence('test-jasmine', cb);
});
// ===========================================================================
// Builds the frontend
// ===========================================================================
gulp.task('build-app', function (cb) {
    runSequence(
        'build-clean-app',
        'move-tmp',
        'tmp-app-static',
        'constants',
        'build-webpack',
        'build-app-html',
        'move-dist', cb);
});

/**
 * ######################################################################################
 * ######################################################################################
 * Dependend Tasks come here
 * ######################################################################################
 * ######################################################################################
 */

// ==========================================================================
// Start server for Development
// ==========================================================================
gulp.task('connect', function() {
    connect.server({
        root: distAppPath,
        port: 3000,
        livereload: true
    });
});
// =========================================================
// Start all clean tasks
// =========================================================
gulp.task('build-clean', ['build-clean-app'], function (cb) {
    cb();
});
// ==========================================================
// Remove all app code in dist folder
// ==========================================================
gulp.task('build-clean-app', function (cb) {
    return del([distAppPath, tmpPath], {}, cb);
});
// ==========================================================================
// Creates a config files as angular module
// ==========================================================================
gulp.task('constants', function () {
    var myConfig = require(srcConfigPath);
    var envConfig = myConfig[env];

    return ngConstant({
        name: 'config',
        wrap: 'commonjs',
        constants: envConfig,
        stream: true
    }).pipe(gulp.dest(tmpConfigPath));
});

// ===========================================================
// Create webpacked files
// ===========================================================
gulp.task('build-webpack', function (callback) {
    if (env === 'development') {
        webpackConfig.debug = true;
    }

    var webpackCompiler = webpack(webpackConfig);

    webpackCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError('build-webpack', err);
        }
        gutil.log('[build-webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
});

// =================================================================
// Open the browser and opens the frontend of this app
// =================================================================
gulp.task('http-browser', function () {
    var options = {
        url: 'http://localhost:3000'
    };
    return gulp.src(distIndexHtml)
        .pipe(open('', options));
});

/**
 * ######################################################################################
 * ######################################################################################
 * Watching Frontend and Backend and restart server or livereload frontend
 * ######################################################################################
 * ######################################################################################
 */
// ==================================================================
// Start all watch tasks
// ==================================================================
gulp.task('watch', ['watch-app'], function (cb) {
    cb();
});

// ===================================================================
// Watch frontend code and reload the webpage if changes occur
// ===================================================================
gulp.task('watch-app',  function () {
    gulp.watch(['src/app/**/*.html', 'src/app/**/*.js', 'src/styles/**/*.scss'], {debounceDelay: 2000}, function () {
        runSequence('build-app', 'livereload');
    });
});

// ===================================================================
// Reload the browser page
// ===================================================================
gulp.task('livereload', function () {
    gulp.src(distIndexHtml)
        .pipe(connect.reload());
});
/**
 * ######################################################################################
 * ######################################################################################
 * MOVE FILES
 * ######################################################################################
 * ######################################################################################
 */
// =========================================================================
// Build the index.html of the frontend and move it to the app folder
// =========================================================================
gulp.task('build-app-html', function () {
    var script = '<script src="' + webpackConfig.output.filename + '"></script>';
    return gulp.src(tmpIndexHtml)
        .pipe(replace('<!--scripts-->', script))
        .pipe(gulp.dest(tmpAppPath));
});

gulp.task('move-tmp',['move-tmp-app', 'move-tmp-styles']);

gulp.task('move-tmp-app', function(){
    return gulp.src([
        path.join(srcPath,'app', '**')
    ])
        .pipe(gulp.dest(path.join(tmpPath, 'app')));
});

gulp.task('move-tmp-styles', function(){
    return gulp.src([
        path.join(srcPath,'styles', '**')
    ])
    .pipe(gulp.dest(path.join(tmpPath, 'styles')));
});

// =========================================================================
// Move tmp files to dist
// =========================================================================
gulp.task('move-dist', function () {
    return gulp.src(path.join(tmpAppPath, '**'))
        .pipe(gulp.dest(distAppPath));
});
// ==========================================================================
// Move the app static files into the app folder
// ==========================================================================
gulp.task('tmp-app-static', function () {
    return gulp.src(path.join(srcStaticFolder, '**')).pipe(gulp.dest(tmpAppPath));
});

/**
 * ######################################################################################
 * ######################################################################################
 * TEST TASKS
 * ######################################################################################
 * ######################################################################################
 */
// ==========================================================================
// Start frontend unit tests
// ==========================================================================
gulp.task('test-jasmine', ['build-webpack'], function (cb) {
    process.env.NODE_ENV = 'test';
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);
});

// ==========================================================================
// Code Quality
// ==========================================================================
gulp.task('jshint', function () {
    var json = JSON.parse(require('fs').readFileSync(('./.jshintrc')));
    return gulp.src('src')
        .pipe(jshint(json));
});