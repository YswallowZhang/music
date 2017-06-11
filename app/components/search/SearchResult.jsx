import React, { Component } from 'react';
import Songlist from '../songlist/Songlist.jsx';
import styles from './searchresult.css';
import Songbar from '../songlist/Songbar.jsx';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let count = false;
    }
    renderStart() {
        return <div>333</div>
    }
    defaultStyle(e) {
        e.style.background = '#f8f8f8';
        e.style.borderBottom = '1px solid #ccc';
        e.style.borderTop = '2px solid #ccc';
        e.style.borderRight = 'none';
        e.style.borderLeft = 'none';
    }
    clickStyle(e) {
        e.style.background = 'linear-gradient(#f7f7f7, #fff)';
        e.style.borderBottom = '1px solid #fff';
        e.style.borderTop = '2px solid #d13030';
        e.style.borderRight = '1px solid #ccc';
        e.style.borderLeft = '1px solid #ccc';
    } 
    // _resultType(e) {
    //     if(this.count == false) {
    //         this.last = this.refs.default;
    //     } else {
    //         this.count = true
    //     }
    //     let target = e.target, self = this;
    //     self.defaultStyle(self.last);
    //     self.clickStyle(target);
    //     self.last = target;
    // }
    renderFinish() {
        return (
            <div className={styles.box}>
                <div className={styles.number}>
                    <span>搜索"{this.props.search.searchMsg}"</span>
                    <span>查询到<em>{this.props.search.responseMsg.songCount}</em>条结果</span>
                </div>
                <ul className={styles.ulbar}>
                    <li className={styles.ultitle} ref="default">单曲</li>
                    <li className={styles.ultitle}>歌手</li>
                    <li className={styles.ultitle}>专辑</li>
                    <li className={styles.ultitle}>MV</li>
                    <li className={styles.ultitle}>歌词</li>
                    <li className={styles.ultitle}>歌单</li>
                    <li className={styles.ultitle}>主播电台</li>
                    <li className={styles.ultitle}>用户</li>
                </ul>
                <Songlist 
                    data={this.props.search.responseMsg.songs} 
                    songChange={this.props.actions.songChange}
                    addSong={this.props.actions.addSong} 
                />
                <Songbar
                    count={this.props.search.responseMsg.songCount}
                    data={this.props.search.responseMsg.songs}
                    searchAction={this.props.actions.search}
                    searchReducer={this.props.search}
                />
            </div>
        )
    }

    renderError() {
        return <div>22</div>
    }

    render() {
        if(this.props.search.searchState == "START") {
            return this.renderStart();
        } else if(this.props.search.searchState == "FINISH") {
            return this.renderFinish();
        } else if(this.props.search.searchState == "ERROR") {
            return this.renderError();
        }
    }
}