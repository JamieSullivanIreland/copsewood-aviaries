const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    'client': [
      path.resolve(__dirname, './src/public/js/client/delete-items.js'),
      path.resolve(__dirname, './src/public/js/client/image-upload.js'),
      path.resolve(__dirname, './src/public/js/client/messages.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'src/public/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
