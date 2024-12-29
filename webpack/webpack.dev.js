const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('development'),
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
});
