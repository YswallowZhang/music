import React, {Component} from 'react';
import styles from './search.css';
import SearchBar from '../search/SearchBar.jsx';
import SearchResult from '../search/SearchResult.jsx';
import createHistory from 'history/createHashHistory';

const history = createHistory();

export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    _keyDown(e) {
        if(e.which == 13) {
            this.props.actions.search(this.refs.search.value); 
            history.push('/search');
            
        }
    }

    render() {
        return (
            <div className={styles.searchBox}>
                <span className={styles.search}>
                    <input type="text" className={styles.content} placeholder="单曲/歌手/专辑/歌单/MV/用户" ref="search" onKeyDown={e => this._keyDown(e)}/>
                </span>
            </div>
        )
    }
}