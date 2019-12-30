const webpack = require("webpack");
const webpackConfigBase = require("./webpack.base.config");
const merge = require("webpack-merge");

const webpackConfigProd = {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(false),
    })
]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);