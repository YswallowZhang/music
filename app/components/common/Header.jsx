import React, {Component} from 'react';
import Search from './Search.jsx';
import styles from './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.header}>
                <ul className={styles.nav}>
                    <li className={`${styles.list} ${styles.list4}`}><a>发现音乐</a></li>
                    <li className={`${styles.list} ${styles.list4}`}><a>我的音乐</a></li>
                    <li className={`${styles.list} ${styles.list2}`}><a>朋友</a></li>
                    <li className={`${styles.list} ${styles.list2}`}><a>商城</a></li>
                    <li className={`${styles.list} ${styles.list3}`}><a>音乐人</a></li>
                    <li className={styles.list}><a>下载客户端</a></li>
                </ul>
                <Search {...this.props} />
                <div style={{width:'100%',height:5 + 'px' ,backgroundColor: '#c70c0c', position: 'absolute', bottom: 0}}></div>
            </div>    
        )
    }
}