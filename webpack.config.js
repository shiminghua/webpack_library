/**
 * webpack.config.js
 * 
 * @author minghua
 * @date   2019-10-12
 */
const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const pkg = require('./package.json');

const libraryName = pkg.name;
let outputFile, mode;

console.log('----> env: ', env);

if (env === 'build') {
  mode = 'production';
  outputFile = outputFile + '.min.js';
} else {
  mode = 'development';
  outputFile = outputFile + '.js';
}

const config = {
  mode: mode,
  entry: path.resolve(__dirname + '/src/index.js'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    // globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.js|\.jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    // modules: [path.resolve('./node_modules'), path.resolve('./src')],
  }
};

module.exports = config;
