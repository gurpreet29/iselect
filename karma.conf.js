//jshint strict: false

const webpackConfig = require('./webpack.config');
const path = require('path');
const buildReports = path.join(__dirname, 'coverage');

module.exports = function(config) {

  config.set({

    logLevel: config.LOG_INFO,

    basePath: './src',

    files: [
      'index.test.js',
    ],

    preprocessors: {
      'index.test.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters: [
      'junit',
      'coverage-istanbul'
    ],

    junitReporter: {
      outputDir: buildReports,
      outputFile: 'unit.xml',
      useBrowserName: false,
      suite: 'unit'
    },

    coverageIstanbulReporter: {
      reports: ['text-summary', 'lcov'],
      dir: buildReports,
      fixWebpackSourcePaths: true,
    },

    // coverageReporter: {
    //   dir: buildReports,
    //   subDir: '.',
    //   reporters: [
    //     {type: 'html', subdir: 'coverage/'},
    //     {type: 'text', subdir: '.', file: 'coverage.txt'},
    //     {type: 'text-summary'}
    //   ],
    //   // instrumenter: {
    //   //   istanbul: {
    //   //     instrumenterConfig: {fixWebpackSourcePaths: true}
    //   //   }
    //   // },
    //   check: {
    //     global: { // thresholds for all files
    //       statements: 80,
    //       lines: 80,
    //       branches: 80,
    //       functions: 80
    //     },
    //     each: { // thresholds per file
    //       statements: 80,
    //       lines: 80,
    //       branches: 100,
    //       functions: 100,
    //       // overrides: {
    //       //   'baz/component/**/*.js': {
    //       //     statements: 98
    //       //   }
    //       // }
    //     }
    //   },
    //   watermarks: {
    //     statements: [ 50, 75 ],
    //     functions: [ 50, 75 ],
    //     branches: [ 50, 75 ],
    //     lines: [ 50, 75 ]
    //   }
    // }

  });
};
