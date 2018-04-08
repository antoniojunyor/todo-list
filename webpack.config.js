'use strict';
const is_prod = process.env.NODE_ENV === 'production'; // true or false

const webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      path = require('path');

const paths = {
  build: path.resolve(__dirname, 'build/'),
  fonts: path.resolve(__dirname, 'source/assets/fonts'),
  images: path.resolve(__dirname, 'source/assets/images')
};

const css_dev = ['style-loader', 'css-loader', 'sass-loader'];

const css_prod = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader']
});

const html_webpack_plugin = new HtmlWebpackPlugin({
  title: 'Do It Now',
  hash: true,
  template: './public/index.html'
});

const extract_sass = new ExtractTextPlugin({
  filename: 'app.css',
  disable: !is_prod,
  allChunks: true
});

const pluglins_dev = [
  html_webpack_plugin,
  extract_sass,
  new webpack.HotModuleReplacementPlugin()
];

const pluglins_prod = [
  html_webpack_plugin,
  extract_sass,
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
];

const plugins = is_prod ? pluglins_prod : pluglins_dev;

const devtool = is_prod ? '#source-map' : 'inline-source-map';

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    app: [ './source/index.js' ]
  },
  output: {
    path: paths.build,
    publicPath: is_prod ? '' : '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: css_dev
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: 'file-loader?name=[name].[ext]' },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: false },
              optipng: { optimizationLevel: 4 },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          }
        ],
        exclude: [/node_modules/, paths.fonts],
        include: __dirname,
      },
      {
        test: /\.(svg|ttf|woff2)$/,
        exclude: [/node_modules/, paths.images],
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  devtool: devtool,
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    https: false
  }
};
