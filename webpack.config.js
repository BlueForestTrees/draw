var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var Visualizer = require('webpack-visualizer-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
var versions = require('./package.json').dependencies
var NODE_ENV = process.env.NODE_ENV

console.log("NODE_ENV === ", NODE_ENV)

process.traceDeprecation = true

var conf = {
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
            {test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, use: ["style-loader", "css-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new CopyWebpackPlugin([{from: './src/browserconfig.xml', to: '.'}]),
        new LodashModuleReplacementPlugin(),
        new VueLoaderPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
}

if (conf.mode === "development") {

    var convert = require('koa-connect')
    var history = require('connect-history-api-fallback')
    var proxy = require('http-proxy-middleware')

    conf.serve = {
        add: function (app, middleware, options) {
            const targets = require("./targets.json")[process.env.TARGET || "dev"]
            for (let i = 0; i < targets.length; i++) {
                app.use(convert(proxy(targets[i].path, {target: targets[i].host, secure: false, changeOrigin: true})))
            }
            app.use(convert(history()))
        }
    }
    conf.output = {
        publicPath: "/"
    }

    const htmlWebpackPlugin = conf.plugins[0]
    htmlWebpackPlugin.options.min = ".min"
    htmlWebpackPlugin.options.versionVuetify = versions.vuetify
}

if (conf.mode === "production") {
    conf.output = {
        path: path.resolve(__dirname, 'dist/www'),
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    }
    const htmlWebpackPlugin = conf.plugins[0]
    htmlWebpackPlugin.options.min = ".min"
    htmlWebpackPlugin.options.versionVuetify = versions.vuetify

    conf.externals = {
        'vue': 'Vue',
        'vuetify': 'Vuetify'
    }
    htmlWebpackPlugin.options.scriptVue = "<script src='https://unpkg.com/vue@" + versions.vue + "/dist/vue.min.js'></script>"
    htmlWebpackPlugin.options.scriptVuetify = "<script src='https://unpkg.com/vuetify@" + versions.vuetify + "/dist/vuetify.min.js'></script>"

    other()

}

function other() {
    if (process.env.STATS) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        conf.plugins.push(new BundleAnalyzerPlugin({analyzerMode: "static", reportFilename: "../report.html", openAnalyzer: false}))
        conf.plugins.push(new Visualizer({filename: '../statistics.html'}))
    } else {
        console.log("no STATS flag, no stats")
    }
    conf.plugins.push(new CopyWebpackPlugin([
        {from: 'nginx/mime.types', to: '../nginx'},
        {from: 'nginx/nginx.conf', to: '../nginx'}
    ]))
}

module.exports = conf