import React from 'react';
import close from '../assets/images/springFestival/close.png'
import prizeList from '../assets/images/springFestival/prizesList.png'

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

class Prizes extends React.Component {
    constructor(props){
        super(props)
    }

    handleClose() {
        this.props.closePrizes()
    }

    render() {
        return (
            this.props.showPrizes ?
                <div>
                    <div className="prizes" style={{backgroundImage:'url(' + prizeList + ')'}}>
                        <div className="prizeList_closebtn" onClick={this.handleClose.bind(this)} style={{backgroundImage:'url(' + close + ')'}} ></div>

                        <div className="prizeList_btn" onClick={this.handleClose.bind(this)}>确定</div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

export default Prizes

module.exports = exports['default']
