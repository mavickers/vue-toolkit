const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.config.common");

const devConfig = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        "vue-toolkit": path.resolve(__dirname, "src/vue-toolkit.js")
    },

    output: {
        filename: "vue-toolkit.js",
        path: __dirname + "/dist",
        publicPath: "/dist/",
        library: "vueToolkit"
    },

    module: {
        rules: [ ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        })
    ],

    watchOptions: {
        ignored: [ /node_modules/ ]
    }
};

module.exports = merge(commonConfig, devConfig);
