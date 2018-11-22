const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist')
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
