//Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
//Redux 提供createStore这个函数，用来生成 Store。

import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from '../Reducer/index';
import thunkMiddleware from 'redux-thunk';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
//applyMiddleware作用是将所有中间件组成一个数组，依次执行。
//使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。
//Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
//combineReducers 生成一个类似于Reducer的函数 combination 。

//当使用combination的时候，combination会把所有子Reducer都执行一遍，
//子Reducer通过action.type 匹配操作，
//因为是执行所有子Reducer，所以如果两个子Reducer匹配的action.type是一样的，那么都会成功匹配。
//combineReducers方法被调用后所有的reducer返回的state有了各自独立的 part
//后面判断state是否存在 不存在就初始化各自部分的state 调用player reducer返回的state是this.props.player.xxx

var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunkMiddleware)
);

export default store;
