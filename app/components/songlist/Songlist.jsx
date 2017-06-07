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
       let bgcolor;
        return (
            <div className={styles.songbox}>
                <div>
                    {this.props.data.map((item, index) => {
                        if(index % 2 == 1) {
                            bgcolor = '#f7f7f7';
                        } else {
                            bgcolor = '#fff';
                        }
                        return (
                            <div className={styles.each} key={index} style={{backgroundColor:bgcolor,border:'1px solid' + bgcolor }}>
                                <div className={styles.songPlay} onClick={e => {this._songPlay(item)}}><a href=""></a></div>
                                <div className={styles.songName}><a href="">{item.name}</a></div>
                                <div className={styles.songFour}>
                                    <a href="" title="添加到播放列表"><img src="./app/components/songlist/images/add.png" alt=""/></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                </div>
                                <div className={styles.songer}><a href="">{item.ar[0].name}</a></div>
                                <div className={styles.songAlbum}><a href="">《{item.al.name}》</a></div>
                                <div className={styles.songTime}>{this._secTotime(item.dt / 1000)}</div>
                            </div>
                        )  
                    })}
                </div>
            </div>
        )
    }
}