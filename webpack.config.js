/* eslint-disable no-undef */
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


/* The target vertical. Used here to layout the dist folder */
const vertical = 'homeandcontents';


function rules(env) {
  const rules = [

    // Javascript ES6 is transpiled for browser compat.
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 'env' ],
        },
      },
    },

    // Html views are bundled inline
    {
      test: /\.html$/,
      use: [ {
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    },

    {
      // CSS
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },

    {
      test: /\.less/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    },

    // General resources
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ],
    },

    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    },
  ];

  if (env === 'test') {
    rules.push(
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
        enforce: 'post',
        exclude: /node_modules|\.test\.js$/,
      });
  }

  return rules;
}

function plugins(env) {
  if (env === 'test') {
    return [
      new CleanWebpackPlugin([ 'coverage' ]),
    ];
  }

  const plugins = [
    new CleanWebpackPlugin([ 'dist' ]),

    new HtmlWebpackPlugin({
      template: 'static/template/index.html',
    }),

    new UglifyJSPlugin({
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        compress: true
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),

    /* All common shared resources across verticals */
    new CopyWebpackPlugin([ {
      from: 'static/core',
      to: '../core',
      ignore: '**/services/deployment_*.php',
    } ]),

    /* Environment config for PHP services */
    new CopyWebpackPlugin([ {
      context: 'static/core',
      from: `**/services/deployment_${env}.php`,
      to: '../core/[path]/deployment.php',
    } ]),
  ];

  if (env === 'dev') {
    plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return plugins;
}

function moduleAliases(base) {
  return _.assign(base, {
    'variables': path.resolve(__dirname, 'src/styles/variables.less')
  });
}

function environmentAliases(base, env) {
  return _.assign(base, {
    './deployment.json': `./deployment-${env}.json`
  });
}

module.exports = function makeWebpackConfig(env = process.env.npm_lifecycle_event) {
  const config = {
    entry: {
      vendor: [
        'angular',
        'angular-animate',
        'angular-route',
        'angular-sanitize',
        'angular-scroll',
        'angular-spinner',
        'angular-touch',
        'angular-ui-bootstrap',
        'lodash',
        'moment',
      ],
      app: './src/index.js',
    },

    output: {
      filename: `[name].bundle.[${env === 'dev' ? 'hash' : 'chunkhash'}].js`,
      path: path.resolve(__dirname, 'dist', vertical),
    },

    devtool: env === 'test' ? 'inline-source-maps' : 'source-maps',

    devServer: {
      contentBase: './static',
      hot: true,
    },

    resolve: {
      alias: moduleAliases(environmentAliases({}, env))
    },

    module: {
      rules: rules(env),
    },

    plugins: plugins(env),
  };

  return config;
}();