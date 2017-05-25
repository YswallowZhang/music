import React, { Component } from 'react';

import styles from './searchbar.css'
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    componentWillReceiveProps() {
        this.refs.search.value = this.props.search.searchMsg;
    }

    _keyDown(e) {
        if(e.which == 13) {
            this.props.actions.search(this.refs.search.value);
        }
    }

    render() {
        return (
            <div className={styles.searchbar}>
                <input type="text" className={styles.searchinput} ref="search" onKeyDown={e => this._keyDown(e)} />
                <button className={styles.button}><img src="./app/components/common/images/search.png" alt=""/></button>
            </div>
        )
        
    }
}