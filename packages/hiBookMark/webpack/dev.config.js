const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const WebpackResolveConfigPlugin = require('webpack-resolve-config-plugin');
const getDevServerConfig = require('./devServer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectBaseDir = process.cwd();
module.exports = (env = {}, option) => {
  return merge(baseConfig(env, option), {
    devServer: getDevServerConfig({
      projectBaseDir: projectBaseDir,
      ...option
    }),
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  });
};
