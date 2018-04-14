const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;

const conf = {
    entry: './src/main/index.js',

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

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
        new WebpackMildCompile()//recompile x times bug
    ],

    devServer: {
        port: 8078,
        host:"localhost",
        contentBase: path.resolve(__dirname, 'dist'),
        quiet: true
    },

};

conf.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
        messages: [`Running here: http://${conf.devServer.host}:${conf.devServer.port}`],
    }
}));

module.exports = conf;