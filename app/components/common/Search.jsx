import React, {Component} from 'react';

import styles from './search.css';
export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    _onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.searchBox}>
                <span className={styles.search}>
                    <form onSubmit={ e => this._onSubmit(e)}>
                            <input type="text" className={styles.content} placeholder="单曲/歌手/专辑/歌单/MV/用户" ref="search"/>
                    </form>
                </span>
                
            </div>
        )
    }
}