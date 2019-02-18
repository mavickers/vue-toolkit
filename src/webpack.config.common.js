const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,
                use: [{"loader": "source-map-loader"}]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     _: "lodash",
        // }),

        // Clean dist folder.
        new CleanWebpackPlugin(["../dist"], {
            "verbose": true // Write logs to console.
        }),

        // avoid publishing when compilation failed.
        new webpack.NoEmitOnErrorsPlugin()
    ],

    // pretty terminal output
    stats: { colors: true }
};
