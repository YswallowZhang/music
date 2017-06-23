import React, { Component } from 'react';
import styles from './playlist.css'

export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        let arr = [];
        arr = this.props.song.songlist;
        if(arr.length == 0) {
           
        }
        return (
            <div className={styles.playList}>
                <div className={styles.panelHeader}>
                    <p className={styles.panelTitle}>播放列表(<span>{this.props.song.songlist.length}</span>)</p>
                    <a href="" className={styles.collect}><img src="./app/components/songlist/images/add.png" alt="" className={styles.icofont}/>收藏全部</a>
                    <span className={styles.line}></span>
                    <a href="" className={styles.delete}><img src="./app/components/songlist/images/delete.png" alt="" className={styles.icofont}/>清除</a>
                    <span className={styles.close}>X</span>
                </div>
                <div className={styles.panelFooter}>
                    <img src={this.props.picUrl} alt="" className={styles.panelBg}/>
                    <div className={styles.listleft}>
                        {this.props.song.songlist.map((item, index) => {

                        })}
                        <div className={styles.noContent}>
                            <p>你还没有添加任何歌曲</p>
                            <p>去首页<a href="">发现音乐</a>，或在<a href="">我的音乐</a>收听自己收藏的歌单</p>
                        </div>
                        <ul>
                            {this.props.song.songlist.map((item, index) => {
                                return <li>
                                    <div></div>
                                    <div>{item.name}</div>
                                    <div>{}</div>
                                    <div><a href="">{item.ar.name}</a></div>
                                    <div>{this.props.secTotime(item.dt)}</div>
                                    <div></div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.listright}>

                    </div>
                </div>
            </div>  
        )
    }
}