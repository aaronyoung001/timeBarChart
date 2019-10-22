/**
 * Created by Aaron on 2019/10/12.
 */
var path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [path.resolve(__dirname,"./src/index.js")],
    output: {
        path: __dirname,
        filename: "charts.js"
    },
    resolve: {
        alias: {
            '@': resolve('src')// 这样配置后 @ 可以指向 src 目录
        }
    },
    devtool:"source-map",
    module:{
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, include: path.resolve(__dirname,"src"), loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(__dirname,"index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
    ],
    devServer:{
        port:8081,
        open:true
    }
}