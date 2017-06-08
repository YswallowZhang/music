import React, { Component } from 'react';

import styles from './searchbar.css'
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.refs.seain.value = nextProps.search.searchMsg;
    }

    _keyDown(e) {
        if(e.which == 13) {
            this.props.actions.search(this.refs.seain.value, 1, 0);
        }
    }
    _submit() {
        if(! this.refs.seain.value) return
        this.props.actions.search(this.refs.seain.value, 1, 0);
    }

    render() {
        return (
            <div className={styles.searchbar}>
                <input type="text" className={styles.searchinput} ref="seain" onKeyDown={e => this._keyDown(e)} />
                <button className={styles.button}><img src="./app/components/common/images/search.png" alt="" onClick={e => this._submit()}/></button>
            </div>
        )
        
    }
}