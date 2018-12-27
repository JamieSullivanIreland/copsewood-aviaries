const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/server.js',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist')
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  optimization: {
  minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
        exclude: /(node_modules)/,
        extractComments: false
      })
    ]
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
    new CopyWebpackPlugin([
      { from: './src/views', to: './views' },
      { from: './src/public/images', to: './public/images' },
    ])
  ]
}
