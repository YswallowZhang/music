import React, {Component, PropTypes} from 'react';

import styles from "./player.css";

export default class Player extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className={styles.Player}> 
                <div className={styles.blank}>

                </div>
                <div className={styles.lock}>
                    
                </div>
                <div className={styles.centerPlayer}>

                </div>
            </div>
        ); 
    }
}