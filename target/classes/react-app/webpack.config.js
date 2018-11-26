const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const  LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    contentBase: './public',
    inline: true
  },
  output: {
    // path: path.resolve(__dirname, 'public'),
    path: path.resolve(__dirname, '../static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'views/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new LiveReloadPlugin({
      ignore: /(node_modules|src)/
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      GOOGLE_KEY: null
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
          test: /\.css/,
          use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
          ]
      }
    ]
  }
};