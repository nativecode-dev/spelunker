import * as fs from 'fs'
import * as path from 'path'
import * as webpack from 'webpack'

import * as CleanWebpack from 'clean-webpack-plugin'
import * as ExtractText from 'extract-text-webpack-plugin'
import * as HtmlWebpack from 'html-webpack-plugin'
import * as WebpackCleanup from 'webpack-cleanup-plugin'

const BUILD: string = process.env.BUILD || 'release'

const env: string = BUILD.toLowerCase() === 'release' ? 'release' : 'debug'
const root: string = path.resolve(__dirname)
const config: any = JSON.parse(fs.readFileSync('./package.json').toString())

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const Html = (name: string): HtmlWebpack.Config => {
  return {
    excludeChunks: ['background', 'content', name],
    filename: `${name}.html`,
    minify: {
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
    },
    template: './src/public/template.html',
    title: config.name,
    xhtml: true,
  }
}

const configuration: webpack.Configuration = {
  cache: env === 'release',
  context: root,
  entry: {
    background: './src/scripts/background.ts',
    content: './src/scripts/content.ts',
    options: './src/public/options.tsx',
    popup: './src/public/popup.tsx',
    vendor: Object.keys(config.dependencies),
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
    new CleanWebpack(['.nyc_output', 'coverage', 'dist']),
    new CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor',
    }),
    new ExtractText({
      filename: 'styles.css',
    }),
    new HtmlWebpack(Html('options')),
    new HtmlWebpack(Html('popup')),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.ts', '.tsx']
  }
}

export default configuration
