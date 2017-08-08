require('webpack');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        filename: "./dest/public/js/bundle.js"
    },
    devtool: 'eval',
    resolve: {
        extensions: [".jsx", ".js", ".json"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};