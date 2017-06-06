var path = require('path');
var webpack = require('webpack');


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app'); //__dirname 中的app目录，以此类推
var APP_FILE = path.resolve(APP_PATH, "index.jsx"); //根目录文件index.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'project'); //发布文件所存放的目录

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    entry: {
        index: [
            // 'webpack-hot-middleware/client',
            APP_FILE    // 入口文件
        ]
    },
    output: {
        publicPath: '/project', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        // chunkFilename: '[name].[chunkhash:5].min.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader?modules"]
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                use:[{
                    loader: 'file-loader?name=[name].[ext]',
                }]
            }, {
                test: /\.(png|jpg)$/,
                use:[{
                    loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                }]
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),   // 热更新插件
    //     // new webpack.NoErrorsPlugin(),   // 即使有错误也不中断运行
    //     // new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
    //     //     filename: '../index.html', //生成的html存放路径，相对于 path
    //     //     template: './src/template/index.html', //html模板路径
    //     //     hash: false,
    //     // }),
    //     new ExtractTextPlugin('[name].css')
    // ],
    // resolve: {
    //     extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    // }
};