'use strict'
export default function search(state, action) {
    if(action.type != 'SEARCH') {
        if(state) {
            return state
        } else {
            return {
                responseMsg: null,
                errorMsg: null,
                searchState: "FINISH",
                searchMsg: null,
                offset:0
            }
        }
    }
    let newState = Object.assign({}, state);
    newState.searchState = action.state;
    switch(action.state) {
        // case 'CLOSE': 
        //     return  newState
        case 'START':
            newState.searchMsg = action.payload;
            newState.offset = action.offset
            return newState
        case 'FINISH':
            newState.responseMsg =  action.payload;
            newState.offset = action.offset;
            return newState
        case 'ERROR':
            newState.errorMsg = action.payload;
            return newState
        default: 
            return newState
    }
}