var webpack = require('webpack'); 
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var basename = "http://172.29.120.1:8080";
var basename = __dirname;
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    entry: {
        hot  : "./widget/hot/main.js",
        activity: "./widget/activity/main.js",
        headline: "./widget/headline/main.js"
        //commons: []
    },
    output: {
        path: basename + '/dist',
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /(\.jsx?|\.es6)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
	        query: {
       		    presets: ['es2015','react'],
		        cacheDirectory: true
     	    },
	        plugins: [
	            [["antd",{"style": true}]]
	        ]
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader!less-loader?sourceMap")
        },
        {
            test   : /\.(png|jpg)$/,
            loader : 'url-loader?limit=8192'
        },
        {
            test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader'
        },
        { 
            test: /jquery[\\\/]src[\\\/]selector\.js$/,
            loader: 'amd-define-factory-patcher-loader' 
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin("index.css", {
            allChunks: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"development"'
        // }),
         new webpack.HotModuleReplacementPlugin(),
        // new BrowserSyncPlugin(
        //   // BrowserSync options 
        //   {
        //     // browse to http://localhost:3000/ during development 
        //     host: 'localhost',
        //     port: 8080,
        //     // proxy the Webpack Dev Server endpoint 
        //     // (which should be serving on http://localhost:3100/) 
        //     // through BrowserSync 
        //     proxy: basename
        //   },
        //   // plugin options 
        //   {
        //     // prevent BrowserSync from reloading the page 
        //     // and let Webpack Dev Server take care of this 
        //     reload: false
        //   }
        // )
        // new webpack.optimize.CommonsChunkPlugin({
        //      filename: "commons.js",
        //      chunks: [""]
        // })
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}