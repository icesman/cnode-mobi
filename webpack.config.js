const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')
//生成自动引用js文件的HTML
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin')

//打包公共模块 commonChunk
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const entries = {}
const chunks = []
glob.sync('./src/pages/**/*.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('.js')[0]
  entries[chunk] = path
  chunks.push(chunk)
})


const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],//解析文件的拓展名
    alias: {
      assets: join(__dirname, '/src/assets'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules'),
      vfilters: join(__dirname, '/src/filters'),
      struct: join(__dirname, 'node_modules/ax-struct-js/dist/struct.min')
    }
  },
  module: {
    //loader,处理文件转换
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })
          },
          postcss: [
            require('postcss-cssnext')(),
            require('postcss-pxtorem')({
              rootValue: 14.75,
              unitPrecision: 3,
              propList: ['*', '!border*'],
              selectorBlackList: [],
              replace: true,
              mediaQuery: false,
              minPixelValue: 0
            }),
            require('cssnano')()
          ]
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules|lib/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    /*
    打包公用模块，在每个js文件中都有import的才打包
    minChunks为公共模块最少引用次数
    */
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.[hash:8].js',
      chunks: chunks,
      minChunks: function(module){
        return (module.context && ( module.context.indexOf("node_modules") !== -1)); 
      }
    }),
    //css文件打包
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[hash:8].css',
      allChunks: true
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      JQuery: "jquery",
      moment: "moment",
      'window.jQuery': 'jquery',
      _: 'lodash'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlInlineSourcePlugin(),

    new webpack.HotModuleReplacementPlugin()
  ],
  //dev environment config
  devServer: {
    hot: true,
    host: "localhost",
    port: 8010,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/api/v1',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
  // devtool: '#eval-source-map'
}

glob.sync('./src/pages/**/*.html').forEach(path => {
  const filename = path.split('./src/pages/')[1].split('/app.html')[0] + '.html'
  const chunk = path.split('./src/pages/')[1].split('.html')[0]
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    inlineSource: '.(css)$',
    favicon: './src/assets/img/logo.png',
    hash: false,
    chunks: ['vendors', chunk],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
