const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    'client': [
      path.resolve(__dirname, './src/public/js/client/delete-items.js'),
      path.resolve(__dirname, './src/public/js/client/image-upload.js'),
      path.resolve(__dirname, './src/public/js/client/messages.js'),
      path.resolve(__dirname, './src/public/js/client/filters-ls.js'),
      path.resolve(__dirname, './src/public/js/client/sort-dropdown.js'),
      path.resolve(__dirname, './src/public/js/client/pagination.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'src/public/js'),
    publicPath: '/'
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
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  }
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ]
};
