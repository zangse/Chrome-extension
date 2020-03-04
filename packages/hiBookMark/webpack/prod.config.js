const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./base.config");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const projectBaseDir = process.cwd();
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = (env = {}, argv) => {
  console.log(argv);
  return merge(baseConfig(env, argv), {
    output: {
      filename: `[name].[chunkhash].js`,
      chunkFilename: "[name].[chunkhash].js"
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    stats: {
      children: false
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
    ]
  });
};
