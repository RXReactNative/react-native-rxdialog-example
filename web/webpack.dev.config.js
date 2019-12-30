const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
 
const webpackConfigDev = {
    devtool: "inline-source-map",
    mode:'development',
    devServer: {
        historyApiFallback: true
    },
    plugins:[
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(true),
    })]
}
module.exports = merge(webpackConfigBase, webpackConfigDev);
