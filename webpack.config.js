const path = require('path')
const merge = require('webpack-merge')
const Jarvis = require('webpack-jarvis')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const pkg = require('./package.json')
const isDev = process.env.ENV === 'development'

let base = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].min.js',
    library: pkg.name,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  // 从输出的 bundle 中排除依赖
  externals: {
    jquery: 'jQuery',
    zepto: 'Zepto'
  },
  module: {
    rules: [{
        test: /\.js$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            fix: true,
            failOnError: true
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: true, // css 中 url 处理
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e)?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 20
          }
        }]
      },
      {
        test: /\.tpl/,
        loader: 'raw-loader'
      },
      {
        test: /\.html/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            // removeComments: false, // 保留 ssi
            // removeAttributeQuotes: false, // 保留引号
            // collapseWhitespace: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../')
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
}

if (isDev) {
  base = merge(base, {
    plugins: [
      new Jarvis({
        port: 1337 // optional: set a port
      })
    ]
  })
}

module.exports = base
