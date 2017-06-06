import React, { Component } from 'react';
import styles from './songlist.css';


export default class Songlist extends Component {
    constructor(props) {
        super(props);
    }
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
    _songPlay(song) {
        this.props.actions.songChange(song);
    }
    _songAdd(song) {
        this.props.actions.addSong(song);
    }
    render() {
        return (
            <div className={styles.songbox}>
                <div>
                    {this.props.data.map((item, index) => {
                        return (
                            <div className={styles.each}>
                                <div className={styles.songPlay} onClick={e => {this._songPlay(item)}}>we</div>
                                <div className={styles.songName}></div>
                                <div className={styles.songFour}>
                                    <a href="" title="添加到播放列表"><img src="./app/components/songlist/images/add.png" alt=""/></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                </div>
                                <div className={styles.songer}>{item.ar[0].name}</div>
                                <div className={styles.songAlbum}>{item.al.name}</div>
                                <div className={styles.songTime}>{this._secTotime(item.dt)}</div>
                            </div>
                        )  
                    })}
                    {console.log(this.props.data)}
                </div>
            </div>
        )
    }
}