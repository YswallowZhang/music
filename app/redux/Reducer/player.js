//在Reducer 文件里，return的结果(新的state)时候，
//必须要使用Object.assign()来返回新的state,如果不使用，则页面不会跟着数据刷新
//state中的数据不能被修改，只能通过更新state,返回新的state
'use strict'
export default function player(state, action) {
    if(action.type != 'PLAYER') {
        if(state) {
            return state
        } else {
            return {
                isplay: false,
            }
        }
    }
    let newState = Object.assign({}, state);
    switch(action.state) {
        case 'PLAYER_Pause': 
            newState.isplay = false;
            console.log(false)
            return  newState
        case 'PLAYER_PLAY':
            newState.isplay = true;
            console.log(true)
            return newState
        default: 
            return newState
    }
}