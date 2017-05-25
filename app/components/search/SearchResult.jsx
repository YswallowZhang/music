import React, { Component } from 'react';

import styles from './searchresult.css';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.last = this.refs.default;
        this.clickStyle(this.last); 
    }
    renderStart() {
        return <div></div>
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
    _resultType(e) {
        let target = e.target, self = this;
        self.defaultStyle(self.last);
        self.clickStyle(target);
        self.last = target;
    }
    renderFinish() {
        return (
            <div className={styles.box}>
                <div className={styles.number}>
                    <span>搜索"{this.props.search.searchMsg}"</span>
                    {/*<span>查询到<em>{this.props.search.searchResponse.songCount}</em>条结果</span>*/}
                </div>
                <ul className={styles.ulbar} onClick={ e => {this._resultType(e)}}>
                    <li className={styles.ultitle} ref="default">单曲</li>
                    <li className={styles.ultitle}>歌手</li>
                    <li className={styles.ultitle}>专辑</li>
                    <li className={styles.ultitle}>MV</li>
                    <li className={styles.ultitle}>歌词</li>
                    <li className={styles.ultitle}>歌单</li>
                    <li className={styles.ultitle}>主播电台</li>
                    <li className={styles.ultitle}>用户</li>
                </ul>
                {/*<Songlist 
                    data={this.props.search.searchResponse.result.songs} 
                    changeSong={this.props.actions.changeSong}
                    addSong={this.props.actions.addSong} 
                />*/}
            </div>
        )
    }

    renderError() {
        return <div></div>
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