import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';

const NODE_ENV = process.env.NODE_ENV;

const conf = {
    mode: NODE_ENV,
    entry: './src/main/index.js',

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader', options: { loaders: {js: 'babel-loader'}}},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, use: ['style-loader','css-loader']}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/main/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{ from: './src/main/img', to: 'img'}]),
        new VueLoaderPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        }),
    ],

};

if (conf.mode === "development") {
    conf.devServer = {
        port: 8078,
        host: "localhost",
        proxy: {
            "/api": "http://localhost:8080"
        }
    }
}
if (conf.mode === "production") {
    conf.plugins.push(new Visualizer({filename: '../visualizer/statistics.html'}));
    conf.output = {
        filename: 'draw.js',
        path: path.resolve(__dirname, 'dist/draw.blueforest.org')
    };
}

module.exports = conf;