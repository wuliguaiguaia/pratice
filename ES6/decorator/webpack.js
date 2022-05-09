const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index3.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'dist.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
};