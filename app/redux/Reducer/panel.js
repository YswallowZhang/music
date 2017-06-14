'use strict'
export default function panel(state, action) {
    if(action.type != 'PANEL') {
        if(state) {
            return state
        } else {
            return {
                showSongList: false,
            }
        }
    }
    let newState = Object.assign({}, state);
    switch(action.state) {
        case 'CLOSE_LIST': 
            newState.showSongList = false;
            return  newState
        case 'SHOW_LIST':
            newState.showSongList = true;
            return newState
        default: 
            return newState
    }
}