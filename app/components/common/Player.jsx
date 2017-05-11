import React, {Component, PropTypes} from 'react';

import styles from "./player.css";

export default class Player extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentTime: 0,//当前播放到的时间
            playImg: "stopInfo",//开始暂停的图片
            lockImg: "unlock",
            duration: 1,//音频长度以秒计
            buffered: 0,//缓冲范围
            source: "cd",//歌曲资源
            picUrl: "./app/song/images/hehe.jpg",//歌曲图片地址
            songName: "成都",//歌曲的名字
            artists:"赵雷",//歌手
        }
    }
    componentDidMount() {
        let self = this;
        //正在获取媒体数据
        this.refs.audio.addEventListener('progress', function(e) {
            self.setState({
                buffered: e.target.buffered.end(e.target.buffered.length - 1)
            });
        })
        //能够播放，播放需要缓冲
        this.refs.audio.addEventListener('canplay', function() {

        })
        //播放位置被改变
        this.refs.audio.addEventListener('timeupdate', function(e) {
            self.setState({
                currentTime: e.target.currentTime
            });
        }, true)
        //播放时长被改变
        this.refs.audio.addEventListener('durationchange', function(e) {
            self.setState({
                duration: e.target.duration
            });
        })
        //播放完毕后
        this.refs.audio.addEventListener('ended', function() {
            
        })
        //浏览器停止请求数据
        this.refs.audio.addEventListener('seeked', function() {

        })
        let oldx, flag = 0, oldleft, movex;
        this.refs.circle.addEventListener('mousedown', function(e) {
            flag = 1;
            oldx = e.clientX;
            oldleft = parseInt(getComputedStyle(self.refs.circle).marginLeft);      
        })

        window.addEventListener('mousemove', function(e) {
            if(flag) {
                movex = e.clientX;
                console.log(movex)
                self.refs.circle.style.marginLeft = oldleft + movex - oldx + 'px';
            }
        })

        window.addEventListener('mouseup', function() {
            flag = 0
        })
    }
    //显示播放时间
    _secTotime(sec) {
        let min = parseInt(sec / 60);
        if (min < 10) {
        min = '0' + min;
        }
        let second = parseInt(sec % 60);
        if (second < 10) {
        second = '0' + second;
        }

        return min + ':' + second;
    }
    //底部是否锁定
   _isLock() {
        if(this.props.lock.islock) {
            this.props.actions.unlock()
            this.setState({
                lockImg:"unlock"
            })
        } else {
            this.props.actions.lock();
            this.setState({
                lockImg:"lock"
            })
        }
    }
    //上一首
    _previous() {
        this.props.actions.songPrevious();
    }
    //停止or开始
    _stopOrstart() {
        if(!this.props.song.currentSongIndex && this.props.song.songlist.length > 0) {
            this.props.actions.playList(0);
        }
        if(this.props.player.isplay) {
            console.log("暂停", )
            this.props.actions.songPause();
            this.setState({
                playImg: "stopInfo",//暂停的图片    
            })
        } else {
            this.props.actions.songPlay();
            this.setState({
                playImg: "startInfo",//开始的图片    
            })
        }
    }
    //下一首
    _next() {
        this.props.actions.songNext();
    }

    //是否隐藏
    _inFooter() {
        if(this.props.lock.islock) {
            return
        } else {
            this.refs.player.style.bottom = "0px"
        }
    }

    _outFooter() {
        if(this.props.lock.islock) {
            return
        } else {
            this.refs.player.style.bottom = "-45px"
        }
    }

    _changeRule() {
        this.props.actions.songMode()
    }

    // isObjectValueEqual(a, b) {
    //     if(a["album"]["id"] == b["album"]["id"]) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        const {song} = this.props;
        const nextIndex = nextProps.song.currentSongIndex;
        if(nextProps.lock.islock) {
            this.refs.player.style.bottom = "0px"
        }
        
        if(nextProps.player.isplay) {
            this.refs.audio.play();
        } else {
            this.refs.audio.pause();
        }
        if(nextProps.song.songlist.length > 0) {
            this.setState({
                source: nextProps.song.songlist[nextIndex]["album"]["id"],
                picUrl:nextProps.song.songlist[nextIndex]["album"]["picUrl"],
                artists: nextProps.song.songlist[nextIndex]["artists"][0]["name"],
                songName: nextProps.song.songlist[nextIndex]["album"]["name"],
            })
        }
        
    }
    
    render() {
        const self = this;
        return (
            <div className={styles.Player} ref="player" onMouseEnter={ev => this._inFooter()} onMouseLeave={ ev => this._outFooter()}> 
                {/*{this.props.data.map(function(item, index) {
                    return <a key={index} onClick={ev => self.props.actions.songChange(item)}>{item["album"]["id"]}</a>
                })}*/}
                <div className={styles.lock} >
                    <div className={styles.lockImage} onClick={ ev => this._isLock()} data-action={this.state.lockImg}></div>
                </div>
                <div className={styles.blank} >
<audio ref="audio" src={'app/song/' + this.state.source + '.mp3'} controls="controls" className={styles.audio}></audio>
                </div>
                <div className={styles.centerPlayer}>
                    <div className={styles.buttons}>
                        <a className={styles.previous} onClick={ ev => this._previous(ev) }></a>
                        <a className={styles.startOrstop} onClick={ ev => this._stopOrstart(ev)} data-action={this.state.playImg}></a>
                        <a className={styles.next} onClick={ ev => this._next(ev) }></a>
                    </div>
                    <div className={styles.songHead}>
                        <img src={this.state.picUrl} className={styles.picUrl}/>
                    </div>
                    <div className={styles.player}>
                        
                        <div>
                            <a href="##" className={styles.songName}>{this.state.songName}</a>
                            <a href="##" className={styles.artists}>{this.state.artists}</a>
                        </div>
                        <div className={styles.progress}>

                            <div className={styles.barBox}>
                                <div className={styles.buffer}
                                style={{
                                    width: String(this.state.buffered / this.state.duration * 100) + '%'
                                }}
                                ></div>
                                <div className={styles.bar}
                                style={{
                                    width: String(this.state.currentTime / this.state.duration * 100) + '%'
                                }}
                                ></div>
                                <img src="./app/components/common/images/circle.png" alt="" className={styles.circle} style={{left: String(this.state.currentTime / this.state.duration * 100) + '%'}} ref="circle" />
                            </div>
                            <span className={styles.time}><i className={styles.curtime}>{this._secTotime(this.state.currentTime)}</i><i className={styles.alltime}> / {this._secTotime(this.state.duration)}</i></span>
                        </div>
                    </div>
                    <div className={styles.addAndshare}>

                    </div>
                    <div className={styles.changeCloud}>
                        <a className={styles.playrule} onClick={ ev => this._changeRule()}></a>
                    </div>
                </div>
            </div>
        ); 
    }
}