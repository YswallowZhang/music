import React, { Component } from 'react';
import Player from './common/Player.jsx';
import Header from './common/Header.jsx';
import Content from './content/Content.jsx';

import { Link } from 'react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';

import * as Actions from '../redux/Action/Index';


//state.xx是reducer给的,将state映射到 UI 组件的参数（props)
const mapStateToProps = state => {
    return {
        lock: state.lock,
        player: state.player,
        song: state.song,
        search: state.search,
    }
}

//如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，
//键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。
//通过mapDispatchToProps这个方法，把actionCreator(函数)变成方法赋值到props，每当调用这个方法，就会更新State
const mapDispatchToProps = dispatch => {
    let actions = {};
    for(let key in Actions) {
        actions[key] = bindActionCreators(Actions[key], dispatch);
    }
    return {
        actions
    }
}


//如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;
//如果你在constructor中要使用this.props,就必须给super加参数：super(props)；
//（无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）
//如果没用到constructor,是可以不写的
class App extends Component {
    constructor(props:any) {
        super(props);
        
    }
    
    render() { 
        const {actions} = this.props;
        
        return (
            <div className='app'>
                
                <Header {...this.props}/>
                <Player {...this.props}/> 
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

