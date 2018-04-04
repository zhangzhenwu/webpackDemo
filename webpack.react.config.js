const path = require('path');
const webpack = require('webpack');
module.exports ={
    entry:{
        react:['react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]_dll.js',
        library:'_dll_[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}