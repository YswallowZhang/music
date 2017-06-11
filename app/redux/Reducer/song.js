'use strict'
export default function song(state, action) {
    if(action.type != 'SONG') {
        if(state) {
            return state
        } else {
            return {
                currentSongIndex: 0,
                songlist: [],
                songMode: 0,  
            }
        }
    }
    let newState = Object.assign({}, state);
    switch(action.state) {
        //下一首
        case "NEXT" :
            if(newState.songlist.length == 0) {
                return newState
            }

            if(newState.songMode == 0 || newState.songMode == 1) {
                if(newState.currentSongIndex == newState.songlist.length - 1) {
                    newState.currentSongIndex = 0;
                } else {
                    newState.currentSongIndex ++;
                }
            } else {
                if(newState.shuffleIndex == newState.shuffleList.length - 1) {
                    newState.shuffleIndex = 0
                } else {
                    newState.shuffleIndex ++;
                }
                newState.currentSongIndex = newState.shuffleList[shuffleIndex];
            }
            return newState
        //上一首
        case "PREVIOUS" :
            if(newState.songlist.length == 0) {
                return newState
            }

            if(newState.songMode == 0 || newState.songMode == 1) {
                if(newState.currentSongIndex == 0) {
                    newState.currentSongIndex = newState.songlist.length - 1;
                } else {
                    newState.currentSongIndex --;
                }
            } else {
                if(newState.shuffleIndex == 0) {
                    newState.shuffleIndex = newState.shuffleList.length - 1;
                } else {
                    newState.shuffleIndex --;
                }
                newState.currentSongIndex = newState.shuffleList[shuffleIndex];
            }
            return newState
        //播放模式改变
        case "MODE_CHANGE" :
            if(newState.songMode == 2) {
                newState.songMode = 0
            } else {
                newState.songMode ++
            }

            if(newState.songMode == 2) {
                let initShuffle = [];//存放随机的位置
                newState.songlist.forEach(function(item, index) {
                    if(index == 0) {
                        initShuffle[index] = newState.currentSongIndex;
                    } else if(index == newState.currentSongIndex) {
                        initShuffle[index] = 0;
                    } else {
                        initShuffle[index] = index;
                    }
                })
                newState.shuffleIndex = 0;
                newState.shuffleList = makeShuffle(initShuffle, 1);
            }
            return newState
        //更换播放歌曲
        case "SONG_CHANGE" :
            let index = isExit(newState.songlist, action.payload);
            let songarr = [];
            if(index !== false) {
                newState.currentSongIndex = index;
            } else {
                songarr = [...newState.songlist.slice(0), action.payload];
                newState.songlist = songarr;
                newState.currentSongIndex = newState.songlist.length - 1;
            }
            return newState
        //播放列表的歌
        case "PLAY_LIST":
            newState.currentSongIndex = action.payload;//id
            if(newState.songMode == 2) {
                let initShuffle = [];//存放随机的位置
                newState.songlist.forEach(function(item, index) {
                    if(index == 0) {
                        initShuffle[index] = newState.currentSongIndex;
                    } else if(index == newState.currentSongIndex) {
                        initShuffle[index] = 0;
                    } else {
                        initShuffle[index] = index;
                    }
                })
                newState.shuffleIndex = 0;
                newState.shuffleList = makeShuffle(initShuffle, 1);
            }
            return newState
        //添加到播放列表
        case "ADD":
            if(isExit(action.payload, state.songlist)) {
                return state;
            }
            let songlist = [...newState.songlist.slice(0), action.payload];
            newState.songlist = songlist;
            if(newState.playRule == 2) {
                newState.shuffleList.push(newState.songlist.length - 1);
                newState.shuffleList = getShuffle(
                    newState.shuffleList, 
                    newState.shuffleIndex + 1
                );
            }
            if(newState.songlist.length == 1) {
                newState.currentSongIndex = 0;
            }
            return newState
        default: 
            return newState
    }

    function isExit(songlist, newsong) {
        
        for(let i = 0, len = songlist.length; i < len; i ++) {
            if(songlist[i]["id"] == newsong["id"]) {
                return i
            }
        }
        return false
    }

    function makeShuffle(initShuffle, index) {
        let newShuffle = initShuffle.slice(index, initShuffle.length - 1);
        initShuffle = initShuffle.slice(0, index);
        initShuffle.push(...trueShuffle(newShuffle))
        return initShuffle
    }
    function trueShuffle(newShuffle) {
        let temp, flag;
        newShuffle.forEach(function(item, index) {
            flag = Math.floor(Math.random() * (index + 1));
            temp = newShuffle[flag];
            newShuffle[flag] = newShuffle[index];
            newShuffle[i] = temp;
        })
        return newShuffle
    }
}