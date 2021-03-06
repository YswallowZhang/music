import React, {Component} from 'react';
import styles from "./player.css";
import {Tool} from "../../config/Tool.jsx";
import Volume from "./Volume.jsx";
import Playlist from "../songlist/Playlist.jsx";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.autoplay = false;
        this.buffer = true;
        this.state = {
            currentTime: 0,//当前播放到的时间
            playImg: "stopInfo",//开始暂停的图片
            lockImg: "unlock",
            duration: 0,//音频长度以秒计
            buffered: 0,//缓冲范围
            source: "",//歌曲资源
            picUrl: "",//歌曲图片地址
            songName: "",//歌曲的名字
            artists:"",//歌手
        }
    }
    componentDidMount() {
        let self = this;
        //正在获取媒体数据
        this.refs.audio.addEventListener('progress', function(e) {
            if(e.target.buffered.length > 0) {
                self.setState({
                    buffered: e.target.buffered.end(e.target.buffered.length - 1)
                });
            }    
        })
        //能够播放，播放需要缓冲
        this.refs.audio.addEventListener('canplay', function() {
            console.log("canplay")
            if(self.autoplay) {
                self.props.actions.songPlay();
                self.autoplay = false;
            }
        })
        //播放位置被改变
        this.refs.audio.addEventListener('timeupdate', function(e) {
            if(flag == 0) {
                self.setState({
                    currentTime: e.target.currentTime
                });
            }
        }, true)
        //播放时长被改变
        this.refs.audio.addEventListener('durationchange', function(e) {
            self.setState({
                duration: e.target.duration
            });
        })
        //播放完毕后
        this.refs.audio.addEventListener('ended', function() {
            self.props.actions.songNext();
            self.props.actions.songPause();
        })
        //浏览器停止请求数据
        this.refs.audio.addEventListener('seeked', function() {

        })
        this.refs.audio.addEventListener('error', function(error) {
        })
        //进度条拖动
        let oldx, flag = 0, oldleft, movex, max = 493;
        this.refs.circle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            flag = 1;
            oldx = e.clientX;
            oldleft = parseInt(getComputedStyle(self.refs.circle).left);      
        })

        self.refs.player.addEventListener('mousemove', function(e) {
            if(flag) {
                movex = e.clientX;
                let left = movex - oldx;
                if(oldleft + left <= max && oldleft + left >= 0) {
                    self.setState({
                        currentTime: (oldleft + left) / max * self.state.duration
                    }) 
                } 
            }
        })

        document.body.addEventListener('mouseup', function() {
            if(flag == 1) {
                self.refs.audio.currentTime = self.state.currentTime;
                flag = 0;
            }
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
        this.buffer = false
        // this.setState({
        //     source: "",
        //     currentTime:0,
        //     buffered:0
        // });
    }
    //停止or开始
    _stopOrstart() {
        if(!this.props.song.currentSongIndex && this.props.song.songlist.length > 0) {
            this.props.actions.playList(0);
        }
        if(this.props.player.isplay) {
            this.props.actions.songPause();
        } else {
            this.props.actions.songPlay();
        }
    }
    //下一首
    _next() {
        this.props.actions.songNext();
        this.buffer = false
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
    updateVolume(volume, mute) {
        if(mute) {
            this.refs.audio.volume = 0
        } else {
            if(volume < 0.1) {
                volume = 0;
            }
            this.refs.audio.volume = volume;
        }
    }   
    componentWillReceiveProps(nextProps) {
        let self = this;
        const {song} = this.props;
        const nextIndex = nextProps.song.currentSongIndex;
        const lastlist = song.songlist;
        
        if(nextProps.lock.islock && this.props.lock.islock != nextProps.lock.islock) {
            this.refs.player.style.bottom = "0px"
        }

        if(nextProps.player.isplay && this.props.player.isplay == false) {
            // setTimeout(function(){
                self.refs.audio.play();
            // }, 100)
            this.setState({
                playImg: "startInfo",//开始的图片    
            })
        } else if(!nextProps.player.isplay && this.props.player.isplay == true){
            // setTimeout(function(){
                self.refs.audio.pause();
            // }, 100)
            this.setState({
                playImg: "stopInfo",//暂停的图片    
            })
        }
        if(nextProps.song.songlist.length > 0) {
            
            if(lastlist.length == 0 || nextProps.song.songlist[nextIndex].id != song.songlist[song.currentSongIndex].id) {
                console.log("换歌换歌")
                this.setState({
                    picUrl: nextProps.song.songlist[nextIndex].al.picUrl,
                    artists: nextProps.song.songlist[nextIndex].ar[0].name,
                    songName: nextProps.song.songlist[nextIndex].name,
                    currentTime: 0,
                    buffered:0,
                    source:"",
                    duration:0
                })
                
                Tool.getSongUrl(nextProps.song.songlist[nextIndex], data => {
                    if (!data.url) {
                        self.props.actions.songNext();
                    }
                    if (data.id == nextProps.song.songlist[nextIndex].id) {
                        self.setState({
                            source: data.url,
                        });
                        self.props.actions.idUrl(data)
                    }
                    
                });
                self.props.actions.songPause();

            }
        }    
    }
    // shouldComponentUpdate(nextProps, nextState) {
        
    // }
    
    componentDidUpdate(props, state) {
        // update audio
        if (state.source !== this.state.source) {
            this.autoplay = true;
        }
    }
    render() {
        const self = this;
        return (
            <div className={styles.Player} ref="player" onMouseEnter={ev => this._inFooter()} onMouseLeave={ ev => this._outFooter()}> 
                
                <div className={styles.lock} >
                    <div className={styles.lockImage} onClick={ ev => this._isLock()} data-action={this.state.lockImg}></div>
                </div>
                <div className={styles.blank} >
<audio ref="audio" src={this.state.source} controls="controls" className={styles.audio}></audio>
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
                                    width: String(this.state.buffered / (this.state.duration ? this.state.duration: 0.00001) * 100) + '%'
                                }}
                                ></div>
                                <div className={styles.bar}
                                style={{
                                    width: String(this.state.currentTime / (this.state.duration ? this.state.duration: 0.00001) * 100) + '%'
                                }}
                                ></div>
                                <img src="./app/components/common/images/circle.png" alt="" className={styles.circle} style={{left: String(this.state.currentTime / (this.state.duration ? this.state.duration: 0.00001) * 100)+ '%'}} ref="circle" />
                            </div>
                            <span className={styles.time}><i className={styles.curtime}>{this._secTotime(this.state.currentTime)}</i><i className={styles.alltime}> / {this._secTotime(this.state.duration)}</i></span>
                        </div>
                    </div>
                    <Volume updateVolume={this.updateVolume.bind(this)} />
                </div>
                <Playlist {...this.props} picUrl={this.state.picUrl} secTotime={this._secTotime}/>
            </div>
        ); 
    }
}