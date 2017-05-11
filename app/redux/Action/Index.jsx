//State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
//Action 就是 View 发出的通知，表示 State 应该要发生变化了。

import fetch from 'isomorphic-fetch';



//歌曲播放
export const songPlay = (id) => {
    return {
        type: "PLAYER",
        state: 'PLAYER_PLAY',
        payload: id

    }
}
//歌曲暂停
export const songPause = (id) => {
    return {
        type: "PLAYER",
        state: 'PLAYER_Pause',
        payload: id
    }
}
//循环列表、单曲循环、随机循环
export const songMode = () => {
    return {
        type:"SONG",
        state:'MODE_CHANGE'
    }
}
//更换歌单类的歌
export const songChange = (song) => {
    return {
        type: "SONG",
        state: "SONG_CHANGE",
        payload:song
    }
}
 // 更换播放列表的歌
export const playList= (id) => {
    return {
        type: "SONG",
        state: "PLAY_LIST",
        payload: id
    }
}
//下一首
export const songNext = () => {
    return {
        type: 'SONG',
        state: "NEXT",
    }
}
//上一首
export const songPrevious = () => {
    return {
        type: 'SONG',
        state: "PREVIOUS",
    }
}
//展开播放列表
export const showPlayList = () => {
    return {
        type: "PANEL",
        state: "SHOW_LIST"
    }
}
//关闭播放列表
export const closePlayList = () => {
    return {
        type: "PANEL",
        state: "CLOSE_LIST"
    }
}
//音量大小
export const controlVolume = (data) => {
    return {
        type: "VOLUME",
        state: "VOLUME_HEIGHT",
        payload : data
    }
}
//用户正在登录
export const loggingIn = (form) => {
    return {
        type: "USER",
        state: "LOGGING_IN",
        payload: form
    }
}
//用户已经登录
export const loggedIn = (res) => {
    return {
        type: "USER",
        state: "LOGGED_IN",
        payload: res
    }
}
//用户登录失败
export const loggedFail = (err) => {
    return {
        type: "USER",
        state: "LOGGED_FAIL",
        payload: err
    }
}
//游客身份
export const guest = () => {
    return {
        type: "USER",
        state: "GUEST"
    }
}

//锁定
export const lock = () => {
    
    return {
        type: "LOCK",
        state: "LOCK"
    }
}
//未锁定
export const unlock = () => {
    return {
        type: "LOCK",
        state: "UNLOCK"
    }
}


