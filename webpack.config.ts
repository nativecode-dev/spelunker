import * as path from 'path'
import * as webpack from 'webpack'

import * as ExtractText from 'extract-text-webpack-plugin'
import * as HtmlWebpack from 'html-webpack-plugin'
import * as WebpackCleanup from 'webpack-cleanup-plugin'

const BUILD: string = process.env.BUILD || 'release'

const env: string = BUILD.toLowerCase() === 'release' ? 'release' : 'debug'
const root: string = path.resolve(__dirname)

const minify = {
  caseSensitive: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  preserveLineBreaks: true,
  quoteCharacter: '"',
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
}

const typescript: webpack.Configuration = {
  cache: env === 'release',
  context: root,
  entry: {
    background: './src/background.ts',
    content: './src/content.ts',
    options: './src/options.tsx',
    popup: './src/popup.tsx',
    vendor: ['jquery', 'react', 'react-dom', 'string-hash', 'uuidjs'],
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.x?html?$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        }
      }]
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
      test: /\.tsx?$/,
      use: ['ts-loader']
    }, {
      enforce: 'pre',
      exclude: /node_modules/,
      test: /\.js$/,
      use: 'source-map-loader'
    }],
  },
  output: {
    filename: '[name].js',
    path: path.join(root, 'dist'),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor',
    }),
    new ExtractText({
      filename: 'styles.css',
    }),
    new HtmlWebpack({
      excludeChunks: ['background', 'content', 'popup'],
      filename: 'options.html',
      minify,
      template: './src/template.html',
      title: 'spelunker',
      xhtml: true,
    }),
    new HtmlWebpack({
      excludeChunks: ['background', 'content', 'options'],
      filename: 'popup.html',
      minify,
      template: './src/template.html',
      title: 'spelunker',
      xhtml: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /vendor\.js$/
    }),
    new WebpackCleanup({
      preview: true,
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}

const configuration: webpack.Configuration[] = [typescript]

export default configuration
