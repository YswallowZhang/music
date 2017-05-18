//React-Redux 提供Provider组件，可以让容器组件拿到state。
//使用React-Router的项目，与其他项目没有不同之处，也是使用Provider在Router外面包一层，毕竟Provider的唯一功能就是传入store对象。

//所有的exports收集到的属性和方法，都赋值给了Module.exports。
//当然，这有个前提，就是Module.exports本身不具备任何属性和方法。
//如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
//如果你没有显式的给Module.exports设置任何属性和方法，那么你的模块就是exports设置给Module.exports的属性。
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// import route from './router/Route'; //路由配置
import store from './redux/Store/Store';
// import './Config/Config.js';//引入默认配置
import App from "./components/App.jsx";//底部播放器






render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app-root")
);



