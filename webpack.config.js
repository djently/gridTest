const path = require('path'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    NpmInstallPlugin = require('npm-install-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};

const common = {
    context: path.join(__dirname, PATHS.app),
    devServer: {
        outputPath: path.join(__dirname, PATHS.build)
    },
    entry: {
        vendors: [
            'angular',
            path.resolve('./node_modules/angular-ui-grid/ui-grid.js'),
            path.resolve('./node_modules/angular-ui-grid/ui-grid.css')
        ],
        app: [
            PATHS.app,
            'webpack-hot-middleware/client?reload=true'
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel?cacheDirectory=.cache'],
                include: PATHS.app
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ],
        noParse: ['ws']
    },
    externals: ['ws'],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.bundle.[hash].js',
            chunks: ['vendors']
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({  // Also generate a test.html 
            template: path.join(PATHS.app, 'index.ejs'),
            title: 'Grid Test',
            inject: 'body'
        })
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.[hash].js'
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
            hot: true
        },
        plugins: [
            new NpmInstallPlugin({
                save: true
            }),
           new webpack.HotModuleReplacementPlugin(),
           new webpack.NoErrorsPlugin()
        ],
        devtool: 'eval-source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new CleanWebpackPlugin([PATHS.build], {
                dry: false
            })
        ]
    });
}