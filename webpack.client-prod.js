const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/public/js/client.js',
  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'dist/public/js')
  },
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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
      // {
      //   test: /\.s?[ac]ss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'sass-loader'
      //   ],
      // }
    ]
  }
}
