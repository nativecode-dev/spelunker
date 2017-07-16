const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const less = new ExtractTextPlugin({
  filename: '[name].css'
})

module.exports = {
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
    content: path.join(__dirname, 'src/content.ts'),
    options: path.join(__dirname, 'src/options.ts'),
    popup: path.join(__dirname, 'src/popup.ts'),

    bundle: ['moment', 'jquery']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.less$/,
      use: less.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }],
        fallback: 'style-loader'
      })
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
      name: 'bundle',
      filename: 'bundle.js',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      to: path.join(__dirname, 'dist', 'manifest.json')
    }, {
      from: 'src/assets/**/*.png',
      to: path.join(__dirname, 'dist', 'assets', '[name].[ext]')
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['bundle', 'options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['bundle', 'popup']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
