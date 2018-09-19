const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const versions = require('./package.json').dependencies

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
            {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader', options: {loaders: {js: 'babel-loader'}}},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader']}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
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
    conf.output = {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist/var/www/draw.blueforest.org')
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
    conf.plugins.push(new Visualizer({filename: '../../../visualizer/statistics.html'}))
}

module.exports = conf