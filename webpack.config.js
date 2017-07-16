const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
    content: path.join(__dirname, 'src/content.ts'),
    options: path.join(__dirname, 'src/options.ts'),
    popup: path.join(__dirname, 'src/popup.ts'),
    vendor: ['moment', 'jquery']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(html)$/,
      use: ['html-loader']
    }, {
      exclude: /node_modules/,
      test: /\.(json)$/,
      use: ['file-loader']
    }, {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: ['ts-loader']
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      to: path.join(__dirname, 'dist', 'manifest.json')
    }, {
      from: 'src/icon.png',
      to: path.join(__dirname, 'dist', 'icon.png')
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
