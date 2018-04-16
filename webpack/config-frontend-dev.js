var path = require('path')
var webpack = require('webpack')
var config = require(path.join(__dirname, '..', 'backend/config/env/', process.env.NODE_ENV))
var CopyWebpackPlugin = require('copy-webpack-plugin')
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        './frontend/src/index',
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
    ],
    output: {
        path: path.join(__dirname, '..', '/'),
        filename: 'webpack/dev/bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        modules: [path.join(__dirname, '..', 'frontend'),  "node_modules"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(
            {
                ENV: JSON.stringify(config)
            }
        ),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([
            {from: 'frontend/assets/images', to: 'public/assets/images'},
            {from: 'frontend/assets/avatars', to: 'public/assets/avatars'}
        ])
    ],
    module: {
        rules: [{
            loader: 'babel-loader',
            query :{
                presets:['react','stage-2']
            },
            test: /\.js$/,
            include: path.join(__dirname, '..', 'frontend', 'src'),
            exclude: /node_modules/

        }, {
            test: /\.(scss|css)$/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
            include: path.join(__dirname, '..', 'frontend', 'assets')
        }, {
            test: /\.json?$/,
            loaders: ['json-loader']
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader',
            options: {
                name: 'public/assets/images/[name].[ext]',
            }
        }
        ]
    },

    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
}