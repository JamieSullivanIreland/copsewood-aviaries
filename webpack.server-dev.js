const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: 'development',
  entry: './src/server.js',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'src')
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
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

  ]
}
