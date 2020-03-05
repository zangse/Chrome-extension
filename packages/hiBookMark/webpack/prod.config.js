const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./base.config");
const ZipPlugin = require("zip-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const projectName = getProjectName();
const version = require("../src/manifest.json").version;
const zipName = projectName + "-v." + version + ".zip";
module.exports = (env = {}, argv) => {
  console.log(argv);
  return merge(baseConfig(env, argv), {
    plugins: [
      // TODO -need fix not working
      new CleanWebpackPlugin({
        root: __dirname,
        dry: false,
        verbose: true,
        cleanOnceBeforeBuildPatterns: ["lib/*", __dirname + "/" + "*.zip"],
        dangerouslyAllowCleanPatternsOutsideProject: true
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, "..", "lib/"),
        filename: zipName
      }),
      new BundleAnalyzerPlugin()
    ]
  });
};

function getProjectName() {
  console.log(__dirname.split("/"));
  console.log(process.cwd());
  return process
    .cwd()
    .split("/")
    .pop();
}
