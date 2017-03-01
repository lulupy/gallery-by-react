'use strict';
const path = require('path');

const rootPath = path.resolve(__dirname);

module.exports = {
    entry: rootPath + '/src/index.jsx',
    output: {
        path: rootPath + '/dist',
        filename: 'app.js',
        publicPath: '/assets'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader'],
                include: rootPath + '/src/styles'
            },
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader', 'eslint-loader'],
                include: rootPath + '/src'
            }
        ]
    },
    resolve: {
        extensions: [ '.js', 'jsx', '.css']
    },
    devServer: {
        contentBase: rootPath + '/src',
        publicPath:  '/assets',//决定了app.js所在文件夹
        port: 8000,
        host: '0.0.0.0',
        hot: true,
        inline: true
    }
}