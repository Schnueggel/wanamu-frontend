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
    gulptypescript = require('gulp-typescript'),
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
    appscript = 'bootstrap.js',
    tmpPath = path.join(__dirname, 'tmp'),
    tmpAppPath = path.join(tmpPath, 'app'),
    tmpIndexHtml = path.join(tmpAppPath, 'index.html'),
    tmpConfigPath = path.join(tmpAppPath, 'services'),
    distPath = path.join(__dirname, 'dist'),
    distAppPath = path.join(distPath, 'app'),
    distIndexHtml = path.join(distAppPath, 'index.html'),
    node_modules_path = path.join(__dirname, 'node_modules'),
    env = process.WU_ENV || 'development',
    indexFileName = 'index.js',
    typescriptOutFile =path.join(tmpAppPath, 'modules/wanamu//Application.js');

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
    devtool: '#source-map',
    module: {
        noParse: [
            /[\/\\]angular\.js$/,
            /[\/\\]ui-router\.js$/,
            /[\/\\]angular-translate\.js$/,
            /[\/\\]angular-animate\.js$/,
            /[\/\\]angular-il18n\.js$/,
            /[\/\\]angular-messages\.js$/,
            /[\/\\]angular-touch\.js$/,
            /[\/\\]hotkeys\.js$/,
            /[\/\\]moment\.js/,
            /[\/\\]jquery\.js/,
            /[\/\\]spectrum\.js/,
            /lodash/,
            /webpack/,
            /\.html$/
        ],
        loaders : [
            //{
            //    test: /\.js$/,
            //    loader: 'babel'
            //},
            {
                test: /\.(html|svg|txt)$/,
                loader: 'raw'
            },
            {
                test: /\.(eot|ttf)$/,
                loader: 'url?limit=1000000'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test: /package\.json$/,
                loader: 'environment-config-webpack-loader?environment=' + env
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
    plugins : [],
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
};

if (env === 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        })
    );
}

if (env === 'development') {
    webpackConfig.debug = true;
}

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
    console.log("Building for " + env + ' environment');
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
        'build-typescript',
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

// ==========================================================
// Remove all app code in dist folder
// ==========================================================
gulp.task('build-typescript', function () {
    // TODO remove custom typescript lib if typescript update comes
    var tsResult = gulp.src(path.join( srcAppPath,'**', '*.ts'))
        .pipe(gulptypescript({
            noImplicitAny: true,
            experimentalDecorators: true,
            module : 'commonjs',
            target: 'ES5',
            typescript : require('typescript')
        }));
    return tsResult.js.pipe(gulp.dest(tmpAppPath));
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
    gulp.watch([
        'src/app/**/*.html',
        'src/app/**/*.js',
        'src/styles/**/*.scss',
        'src/app/**/*.ts',
        'src/app/**/*.scss',
        'src/app/**/*.svg'
    ], {debounceDelay: 2000}, function () {
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

gulp.task('move-tmp',['move-tmp-app', 'move-tmp-styles'], function() {
    return gulp.src([
        'robots.txt',
        'humans.txt',
        'crossdomain.xml'
    ]).pipe(gulp.dest(tmpPath));
});

gulp.task('move-tmp-app', function(){
   return gulp.src([
       path.join(srcAppPath, '**', '*.js'),
       path.join(srcAppPath, '**', '*.html'),
       path.join(srcAppPath, '**', '*.svg'),
       path.join(srcAppPath, '**', '*.scss'),
       path.join(srcAppPath, '**', '*.txt')
    ]).pipe(gulp.dest(path.join(tmpPath, 'app')));
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
