'use strict'
export default function search(state, action) {
    if(action.type != 'LOCK') {
        if(state) {
            return state
        } else {
            return {
                islock: false,
            }
        }
    }
    let newState = Object.assign({}, state);
    switch(action.state) {
        case 'UNLOCK': 
            newState.islock = false;
            console.log(false)
            return  newState
        case 'LOCK':
            newState.islock = true;
            console.log(true)
            return newState
        default: 
            return newState
    }
}