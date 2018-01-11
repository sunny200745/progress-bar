// Karma configuration

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/modules/*.js',
      'app/**/*.js',
      'test/spec/**/*.js',
      'app/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8089,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],
    

    // Don't forget to add 'karma-coverage' to your list of plugins
    plugins: [  
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage' ,// required for coverage
      'karma-spec-reporter'
    ],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {  
      'app/**/*.js': ['coverage']
    },
    
    // Code coverage report
    reporters: ['spec', 'coverage'], 

    coverageReporter: {  
      type: 'html',
      dir: 'coverage'
    }

  });
};
