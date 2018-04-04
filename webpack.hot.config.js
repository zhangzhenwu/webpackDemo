const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './hot/index.js',
    // entry:{
    //     pageA: "./hot/pageA",
	// 	pageB: "./hot/pageB",
	// 	pageC: "./hot/pageC"
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["env", "stage-0","react"]
                    }
                },
                include: path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new HtmlWebpackPlugin({
            template: './hot/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()//用户名替代id
    ],
    optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
    devServer: {//配置此静态文件服务器，可以用来预览打包后项目
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 9090,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    }
}