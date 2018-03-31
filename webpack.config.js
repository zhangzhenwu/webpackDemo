const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssExtract = new ExtractTextWebapckPlugin('css.css');
const lessExtract = new ExtractTextWebapckPlugin('less.css');
const sassExtract = new ExtractTextWebapckPlugin('sass.css');
const PUBLIC_PATH='./';
module.exports = {
    entry: [path.resolve(__dirname, 'src', 'index.js'),path.resolve(__dirname, 'src', 'base.js')],
    entry:{
        index:'./src/index.js',
        base:'./src/base.js',
        // vendor:'jquery'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath:PUBLIC_PATH
    },
    resolve:{
        extensions: ["",".js",".css",".json"]
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                // loader:['style-loader','css-loader']
                use:cssExtract.extract({
                    use:['css-loader','postcss-loader']
                })

            },
            {
                test:/\.less$/,
                use:lessExtract.extract({
                    use: ['css-loader','less-loader']
                })
            },
            {
                test:/\.scss$/,
                use: sassExtract.extract({
                    use:['css-loader','sass-loader']
                })
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["env", "stage-0"]
                    }
                }
            },
            {
                test:/\.(jpg|png|svg|bmp)/,
                loader:'url-loader',
                options:{
                    limit:2048,
                    outputPath:'images/'
                }
            },
            {
                test:/\.(html|htm)$/,
                use:'html-withimg-loader'
            }
        ]
    },
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/, //忽略不用监听变更的目录
    //     aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    //     poll:1000 //每秒询问的文件变更的次数
    // },
    plugins:[
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // }),
        new CleanWebpackPlugin(path.resolve(__dirname,'dist')),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html'),
            filename:'index.html',
            // chunks:['index','vendor'],
            chunks:['index'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html'),
            filename:'base.html',
            // chunks:['base','vendor'],
            chunks:['base'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        // new ExtractTextWebapckPlugin('css/index.css')
        cssExtract,
        lessExtract,
        sassExtract
    ],
    devServer: {//配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 9090,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    }
}