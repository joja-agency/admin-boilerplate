var path = require('path')
var webpack = require('webpack')


var config = {};

var serverConfig = Object.assign({}, config, {
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
    serverConfig, migrationConfig,
];