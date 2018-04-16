var path = require('path')
var webpack = require('webpack')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')


var config = {};

var backendConfig = Object.assign({}, config, {
    devtool: '#cheap-module-eval-source-map',
    target: 'node',
    entry: [
        './backend/app'
    ],
    output: {
        path: path.join(__dirname, '..', 'backend', 'dist'),
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ["*", ".js", ".json", ".node"],
        modules: [path.join(__dirname, '..', 'backend')],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }, 
            {
                test: /\.json?$/,
                loaders: ['json-loader']
            },
            { test: /\.node$/, loader: "node-loader" }
        ]
    },
    externals: [
        /^(?!\.|\/).+/i,
    ]
});

var configPath = require(path.join(__dirname, '..', 'backend/config/env/', process.env.NODE_ENV))

var frontendConfig = Object.assign({}, config,{

    devtool: 'source-map',
    entry: [
        './frontend/src/index'
    ],
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            ENV: JSON.stringify(configPath)
        }),
        new UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {from: 'frontend/assets/images', to: 'assets/images'},
            {from: 'frontend/assets/avatars', to: 'assets/avatars'}
        ])
    ],
    module: {

        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, '..', 'frontend', 'src')
        }, {
            test: /\.(scss|css)$/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
            include: path.join(__dirname, '..', 'frontend', 'assets')
        }, {
            test: /\.json?$/,
            loaders: ['json-loader']
        },
        //     {
        //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        //     loader: 'url-loader',
        //     include: [
        //         path.join(__dirname, '..', 'frontend', 'assets')
        //     ],
        //     options: {
        //         fallback: 'responsive-loader'
        //     }
        // },
            {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader',
            options: {
                name: 'assets/images/[name].[ext]',
            },

        }]
    }


});


var migrationConfig = Object.assign({}, config,{
    devtool: '#cheap-module-eval-source-map',
    target: 'node',
    entry: [
        './backend/db/migrate'
    ],
    output: {
        path: path.join(__dirname, '..', 'backend', 'dist'),
        filename: 'migrate.js',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ["*", ".js", ".json", ".node"],
        modules: [path.join(__dirname, '..', 'backend', 'db')],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        },
            {
                test: /\.json?$/,
                loaders: ['json-loader']
            },
            { test: /\.node$/, loader: "node-loader" }
        ]
    },
    externals: [
        /^(?!\.|\/).+/i,
    ]
});


module.exports = [
    backendConfig, frontendConfig, migrationConfig
];