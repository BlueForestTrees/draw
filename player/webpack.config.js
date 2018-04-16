const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const conf = {
    entry: './src/index.js',

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
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new WebpackMildCompile(),//recompile x times bug
        new UglifyJsPlugin()
    ],

    devServer: {
        port: 8077,
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