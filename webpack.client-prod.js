const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: 'development',
  entry: './src/public/js/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist/public/js')
  },
  target: 'web',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  plugins: [
    new ConcatPlugin({
      outputPath: '/dist/public/js',
      fileName: 'index.js',
      filesToConcat: ['./src/public/js/client/**'],
      attributes: {
        async: true
      }
    })
  ]
}
