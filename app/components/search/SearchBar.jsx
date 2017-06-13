import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory'

const history = createHistory();
history.listen(location => {
    
})
import styles from './searchbar.css';
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        this.refs.seain.value = nextProps.search.searchMsg;
        console.log(history.location)
    }

    _keyDown(e) {
        if(e.which == 13) {
            this.props.actions.search(this.refs.seain.value, 1, 0);
            history.push({
                pathname: '/search',
                search: '?keywords=' + encodeURI(this.refs.seain.value) + '&type=1',
                state: {
                    type:1,
                    keywords:this.refs.seain.value,
                    offset:0
                }
            })
            console.log(history)
        }
    }
    _submit() {
        if(! this.refs.seain.value) return
        this.props.actions.search(this.refs.seain.value, 1, 0);
        history.push({
            pathname: '/search',
            search: '?keywords=' + encodeURI(this.refs.seain.value) + '&type=1',
            state: {
                type:1,
                keywords:this.refs.seain.value,
                offset:0
            }
        })
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