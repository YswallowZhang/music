// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

// // 相当于通过本地node服务代理请求到了http://cnodejs.org/api
// var proxy = [{
//     path: '/*/*',
//     target: 'http://localhost:3000',
//     host: 'localhost:3000'
// }];

// //启动服务
// var server = new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     hot: true,
//     inline: true,
//     proxy: proxy,
//     stats: {
//         colors: true
//     },
//     proxy: proxy,
//     historyApiFallback: true,
// });

// //将其他路由，全部返回index.html
// server.app.get('*', function (req, res) {
//     res.sendFile(__dirname + '/index.html')
// });

// server.listen(3000);
