import React, { Component } from 'react';
import styles from './songbar.css';

export default class Songbar extends Component {
    
    constructor(props) {
        super(props);
        this.arr = [];
        this.length = Math.ceil(this.props.count / 30);
        for(let i = 0; i < this.length; i ++) {
            this.arr[i] = i + 1;
        }
    }
    _changePage(index) {
        this.props.searchAction(this.props.searchReducer.searchMsg, 1, index * 30);
    }
    _previous(index) {
        this.props.searchAction(this.props.searchReducer.searchMsg, 1, (index - 1) * 30);
    }
    _next(index) {
        this.props.searchAction(this.props.searchReducer.searchMsg, 1, (index + 1) * 30);
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        return (<div className={styles.box}>
            <div className={styles.content}>
                <a href="javascript:void(0)" onClick={() => this._previous(this.props.searchReducer.offset)}>上一页</a>
                {this.arr.map((item, index) => {
                    if(this.length < 8) {
                        return <a href="javascript:void(0)" key={index} className={styles.pages} onClick={ ({idnex}) => this._changePage(index)}>{item}</a>
                    } else {
                        if((index < 8 && this.props.searchReducer.offset < 4) || (index > this.props.searchReducer.offset - 4 &&  index < this.props.searchReducer.offset + 4) || index == this.length - 1 || index == 0 || (this.props.searchReducer.offset >= this.length - 7 && index >= this.length - 7)) {
                            return <a href="javascript:void(0)" key={index} className={styles.pages} onClick={ ({idnex}) => this._changePage(index)}>{item}</a>
                        }else if(this.props.searchReducer.offset >= 4 && index == 1) {
                            return <span key={index}>...</span>
                        } else if(this.props.searchReducer.offset <= this.length - 5 && index == this.length - 2) {
                            return <span key={index}>...</span>
                        }
                    }
                })}
                <a href="javascript:void(0)" onClick={() => this._next(this.props.searchReducer.offset)}>下一页</a>
            </div>
            
        </div>)
    
    }
}
