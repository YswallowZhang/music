'use strict'
export default function router(state, action) {
    if(action.type != 'ROUTER') {
        if(state) {
            return state
        } else {
            return {
                
            }
        }
    }
    let newState = Object.assign({}, state);
    switch(action.state) {
        case 'PUSH':
            return newState
        case 'POP':
            return newState
        default: 
            return newState
    }
}