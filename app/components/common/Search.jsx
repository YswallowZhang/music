import React, {Component} from 'react';
import styles from './search.css';
import SearchBar from '../search/SearchBar.jsx';
import SearchResult from '../search/SearchResult.jsx';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory'

const history = createHistory();
history.listen(location => {
    console.log(location)
})
export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    _keyDown(e) {
        if(e.which == 13) {
            this.props.actions.search(this.refs.search.value, 1, 0); 
            history.push({
                pathname: '/search',
                search: '?keywords=' + encodeURI(this.refs.search.value) + '&type=1',
                state: {
                    type:1,
                    keywords:this.refs.search.value,
                    offset:0
                }
            })
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