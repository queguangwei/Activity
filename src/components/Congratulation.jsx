import React from 'react';
import close from '../assets/images/springFestival/close.png'
import redpacket from '../assets/images/springFestival/redpacket.png'
import prize from '../assets/images/springFestival/prize.png'
import blessing from '../assets/images/springFestival/blessing.png'

class Mark extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: {
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: 'rgba(1,1,1,0.6)',
                height: '100%',
                zIndex: '1'
            }
        }
    }
    render() {
        return (
            <div style={this.state.style}></div>
        )
    }
}

class Congratulation extends React.Component {
    constructor(props){
        super(props)
    }

    handleClose() {
        this.props.close()
    }

    getPrizeImg(prizeName) {
        switch (prizeName)
        {
            case '行车记录仪':
                return <i className="tachograph"></i>
                break
            case '博朗剃须刀':
                return <i className="shaver"></i>
                break
            case '小米空气净化器':
                return <i className="airCleaner"></i>
                break
            case '小米电饭锅':
                return <i className="riceCooker"></i>
                break
            case 'iPad':
                return <i className="ipad"></i>
                break
            case '笔记本电脑':
                return <i className="notebook"></i>
                break
        }
    }

    render() {
        if (this.props.showDialog) {
            document.body.style.overflow = 'hidden'
        }
        const prizeImg = this.getPrizeImg(this.props.prizeInfo.prizeName)
        return (
            this.props.showDialog ?
                <div>
                    <div className="congratulation" style={{backgroundImage:'url(' + (this.props.prizeInfo.type == 1 ? blessing :(this.props.prizeInfo.type == 2 ? redpacket : prize)) + ')'}}>
                        <div className="congratulation_closebtn" onClick={this.handleClose.bind(this)} style={{backgroundImage:'url(' + close + ')'}}></div>
                        {
                            this.props.prizeInfo.type == 1?null
                            :(this.props.prizeInfo.type == 2 ?
                            <div className="packetContent">￥<em>{this.props.prizeInfo.prizeName}元</em></div>
                            :
                            <div>
                                <div className="prizeImg">
                                    {prizeImg}
                                </div>
                                <div className="prizeTip">抽中{this.props.prizeInfo.prizeName}</div>
                            </div>)
                        }
                        <div className="congratulation_btn" onClick={this.handleClose.bind(this)}>确定</div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

export default Congratulation

module.exports = exports['default']
