import React, {Component} from 'react';
import styles from './volume.css';


export default class Volume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume:1,//音量大小
            mute:false,//静音
            visible:"hidden"//是否显示音量
        }
    }
    componentDidMount() {
        let self = this;
        let Height = parseInt(getComputedStyle(self.refs.wrapper).height);
        let y, volume, oldY, moveY, oldTop, flag = 0;
        // this.refs.wrapper.addEventListener('click', function(e) {
        //     y = e.pageY;
        //     volume = (y - Y) / Height;

        //     self.setState({
        //         volume:(1 - volume)
        //     })
        //     self.props.updateVolume(volume, this.mute);
        // })
        this.refs.vocircle.addEventListener('mousedown', function(e) {
            flag = 1;
            e.preventDefault();
            oldY = e.pageY;
            oldTop = parseInt(getComputedStyle(self.refs.vocircle).top);
        })
        this.refs.wrapper.addEventListener('mousemove', function(e) {
            if(flag) {
                moveY = e.pageY;
                let height = moveY - oldY;
                if(oldTop + height < Height && oldTop + height >= 0) {
                    volume = 1 - (oldTop + height) / Height;
                    self.setState({
                        volume: volume
                    }) 
                    self.props.updateVolume(volume, this.mute);
                } 
            }
        })
        document.body.addEventListener('mouseup', function() {
            if(flag == 1) {
                flag = 0;
            }
        })
    }
    _controlV() {
        if(this.state.visible == "hidden") {
            this.setState({
                visible:"visible"
            })
        } else {
            this.setState({
                visible:"hidden"
            })
        }
    }
    render() {
        return (<div className={styles.volumeBox}>
            <div className={styles.volume} onClick={e => this._controlV()}>
                <img src="app/components/common/images/volume.png" alt="" className={styles.img} />
            </div>
            <div className={styles.wrapBox} style={{visibility:this.state.visible}}>
                <div className={styles.wrapper} ref="wrapper" >
                    <div className={styles.progress} style={{height:this.state.volume * 100 + '%', top: (1 - this.state.volume) * 100 + '%'}}>

                    </div>
                    <img src="app/components/common/images/vocircle.png" alt="" className={styles.vocircle} style={{top:(1 - this.state.volume) * 100 + '%'}} ref="vocircle" />
                </div>
            </div>
        </div>)
    }
}