import * as path from 'path'
import * as webpack from 'webpack'

import * as ExtractText from 'extract-text-webpack-plugin'
import * as HtmlWebpack from 'html-webpack-plugin'

const NODE_ENV: string = process.env.NODE_ENV || 'release'

const env: string = NODE_ENV.toLowerCase() === 'release' ? 'release' : 'debug'
const root: string = path.resolve(__dirname)

const typescript: webpack.Configuration = {
  cache: env === 'release',
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
      exclude: /node_modules/,
      test: /\.x?html?$/,
      use: ['html-loader']
    }, {
      exclude: /node_modules/,
      test: /\.json$/,
      use: ['file-loader?name=[name].[ext]']
    }, {
      exclude: /node_modules/,
      test: /\.png$/,
      use: ['file-loader?name=icons/[name].[ext]', 'img-loader']
    }, {
      exclude: /node_modules/,
      test: /\.scss$/,
      use: ExtractText.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }, {
      exclude: /node_modules/,
      test: /\.ts$/,
      use: ['ts-loader']
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
    }),
    new ExtractText({
      filename: 'styles.css'
    }),
    new HtmlWebpack({
      excludeChunks: ['background', 'content', 'popup'],
      filename: 'options.html',
      title: 'spelunker'
    }),
    new HtmlWebpack({
      excludeChunks: ['background', 'content', 'options'],
      filename: 'popup.html',
      title: 'spelunker'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts']
  }
}

const configuration: webpack.Configuration[] = [typescript]

export default configuration
