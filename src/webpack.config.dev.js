const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

const devConfig = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        "vue-toolkit": "./vue-toolkit.js"
    },

    output: {
        filename: "vue-toolkit.js",
        path: "../dist",
        publicPath: "/dist/",
        // Defining a global var that can used to call functions from within ASP.NET Razor pages.
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
