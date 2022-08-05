/* eslint-disable no-process-env */

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var debug = !(process.env.NODE_ENV === 'production' || process.env.BUILD_ENV === 'travis');

var KARMA_ENTRY = './karma.entry.js';
var preprocessors = {};
preprocessors[KARMA_ENTRY] = 'webpack';

function makeDefaultConfig() {

  return {
    files: [KARMA_ENTRY],
    singleRun: !debug,
    autoWatch: debug,
    frameworks: ['mocha', 'sinon-chai'],
    preprocessors: preprocessors,
    reporters: ['progress'],
    browsers: (debug ? ['ChromeHeadless', 'Chrome'] : ['ChromeHeadless']),
    webpack: {
      plugins: webpackConfig.plugins
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-chrome-launcher')
    ],
    logLevel: 'INFO'
  };
}

module.exports = function (config) {
  config.set(makeDefaultConfig());
  return config;
};
