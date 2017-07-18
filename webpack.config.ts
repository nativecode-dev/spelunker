import * as path from 'path'
import * as webpack from 'webpack'

import * as ExtractText from 'extract-text-webpack-plugin'
import * as HtmlWebpack from 'html-webpack-plugin'

const NODE_ENV: string = process.env.NODE_ENV || 'release'

const env: string = NODE_ENV.toLowerCase() === 'release' ? 'release' : 'debug'
const root: string = path.resolve(__dirname)

const html: webpack.Configuration = {
  cache: true,
  context: root,
  entry: {
    options: './src/options.html',
    popup: './src/popup.html',
    styles: './src/styles/spelunker.scss'
  },
  module: {
    rules: [{
      test: /\.x?html?$/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.scss$/,
      use: ExtractText.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(root, 'dist')
  },
  plugins: [
    new ExtractText('[name].css'),
    new HtmlWebpack({
      filename: '[name].html'
    })
  ]
}

const typescript: webpack.Configuration = {
  cache: true,
  context: root,
  entry: {
    background: './src/background.ts',
    content: './src/content.ts',
    options: './src/options.ts',
    popup: './src/popup.ts',
    vendor: ['jquery', 'string-hash', 'uuidjs']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: {
        loader: 'ts-loader',
        options: {
          declaration: false
        }
      }
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(root, 'dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts']
  }
}

const configuration: webpack.Configuration[] = [html, typescript]

export default configuration
