const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV;

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

const buildingForLocal = () => {
  return (NODE_ENV === 'development');
};

const setPublicPath = () => {
  let env = NODE_ENV;
  return '/';
};

const extractHTML = new HtmlWebpackPlugin({
  title: 'CulinaryOn',
  filename: 'index.html',
  inject: true,
  template: setPath('/src/layout.ejs'),
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true
  },
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  imgPath: (!buildingForLocal()) ? 'images' : 'src/images'
});


const config = {
  output: {
    path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'),
    publicPath: setPublicPath(),
    filename: buildingForLocal() ? 'js/[name].js' : 'js/[name].[hash].js'
  },
  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    }
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  mode: buildingForLocal() ? 'development' : 'production',
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  plugins: [
    extractHTML,
    new MiniCssExtractPlugin({
      filename: 'css/styles.[hash].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
        NODE_ENV: '"'+NODE_ENV+'"'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            'presets': ['env', 'es2015']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 10', 'last 2 version']
                })
              ],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]?[hash]',
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(jpe?g|gif|svg|ico|ttf|otf|woff|woff2)(\?[a-z0-9=&.]+)?$/i,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]?[hash]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
        options: {
          name: '[path][name].[ext]?[hash]',
        },
      },
    ]
  },
};
module.exports = config; 
