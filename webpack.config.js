const path = require('path')
const HtmlWebpackPlugin = require( 'html-webpack-plugin')
const CopyWebpackPlugin = require( 'copy-webpack-plugin')
const Visualizer = require( 'webpack-visualizer-plugin')
const ExtractTextPlugin = require( 'extract-text-webpack-plugin')
const { VueLoaderPlugin } = require( 'vue-loader')

const NODE_ENV = process.env.NODE_ENV

const conf = {
    mode: NODE_ENV,
    entry: './src/index.js',

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
        new CopyWebpackPlugin([{ from: './src/img', to: 'img'}]),
        new VueLoaderPlugin(),
        new ExtractTextPlugin("style.css")
    ],

}

if (conf.mode === "development") {
    const convert = require('koa-connect')
    const proxy = require('http-proxy-middleware')

    conf.serve = {
        add: function (app, middleware, options) {
            app.use(convert(proxy('/api', {target: 'http://localhost:8089'})))
        }
    }
    conf.output = {
        publicPath: "/"
    }
}
if (conf.mode === "production") {
    conf.plugins.push(new Visualizer({filename: '../../visualizer/statistics.html'}))

    conf.output = {
        filename: 'draw.js',
        path: path.resolve(__dirname, 'dist/draw.blueforest.org/static')
    }
    conf.plugins.push(new CopyWebpackPlugin([{from: 'nginx.conf', to: '../nginx/'}]))
}

module.exports = conf