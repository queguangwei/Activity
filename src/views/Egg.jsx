import React, { Component } from 'react'
import { Progress, Popover, Icon } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import DocumentTitle from 'react-document-title'

class EggRule extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClose() {
        this.props.close()
    }

    render() {
        return (
            <div className="eggLottery">
                <Icon type="close-circle" theme="outlined" className="closeCircle" style={{fontSize:30,color:'#fff'}} onClick={this.handleClose.bind(this)}/>
                <article className="rule">
                    <h3>活动规则</h3>
                    <span>活动时间：2018-xx-xx至2018-xx-xx</span>
                    <p>1、活动期间每个账户每日有5次抽奖机会。</p>
                    <p>2、抵用金自获取之日起有效。</p>
                    <p>3、抵用金可...</p>
                    <p>4、抵用金不可...</p>
                    <p>5、每日抵用金...</p>
                </article>
            </div>
        )
    }
}

class EggMark extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    gotit() {
        this.props.gotit()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
		const open = this.props.open
        return (
            <div className="eggLottery">
                <div className="lower animation" style={open?{display:'none'}:{}}></div>
                <div className="upper open" style={open?{}:{display:'none'}}>
                    {this.props.thx?
                        <div className="eggLottery__thx">
                            <p className="eggLottery__thx__title">手慢一步, 没抢到哦～</p>
                            <p className="eggLottery__thx__subtitle">谢谢参与</p>
                            <span>换个姿势抽奖可能会有惊喜哦～</span>
                        </div>:
                        <div className="eggLottery__win">
                            <p className="eggLottery__win__title">抽中吉利蛋啦～</p>
                            <span>抵用金</span>
                            <p className="eggLottery__win__amount">8888.00元</p>
                            <span className="eggLottery__win__direction">
                            <p>满10000元信用金可用</p>
                            <p>部分个股不可使用</p>
                            </span>
                        </div>}
                    <div className="eggLottery__button">
                        <button className="gotit" onClick={this.gotit.bind(this)}>知道了</button>
                        <button>使用抵佣金</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Egg extends Component {
    constructor (props) {
        super(props)
        this.timer = null,
        this.state = {
            ruleVisible: false,
            rolling: false,
            visible: false,
			open: false,
            runout: false,
            count: 5,
            winners: [],
            scroll: {
                top: 0,
                reTop: 6,
            },
            thx: false
        }
    }

    componentDidMount() {
        this.getWinners()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getWinners() {
        const winners = [0,1,2,3,4,5,6,7,8,9];
        this.setState({winners: winners})
        this.startScroll()
    }

    startScroll() {
        const handleScroll = this.handleScroll.bind(this)
        this.timer = setInterval(() => {
            handleScroll()
        },2000)
    }

    handleScroll(){
        const state = this.state
        if(state.winners.length <= 5){
            return
        }
        if(state.scroll.top <= 0){
            state.scroll.top += -1
            state.scroll.reTop = state.scroll.top + state.winners.length
            console.log("retop"+state.scroll.reTop+";top"+ state.scroll.top)
            if(state.scroll.reTop == -1){
                // 替换
                state.scroll.top = state.scroll.reTop + state.winners.length
            }
        }else if(state.scroll.reTop <= 0){
            state.scroll.reTop += -1
            state.scroll.top = state.scroll.reTop + state.winners.length
            console.log("retop"+state.scroll.reTop+";top" +state.scroll.top)
            if(state.scroll.top == -1){
                // 替换
                state.scroll.reTop = state.scroll.top + state.winners.length
            }
        }
        this.setState(state)
    }

    handleClick () {
        //用随机数模拟
        let r = Math.floor(Math.random()*10)
        const state = this.state
        if(r === 0){
            state.thx = true
        }
        state.rolling = true
        state.count = state.count - 1
        this.setState(state)
        setTimeout(()=>{
            if(state.count == 0){
                state.runout = true
            }
            state.rolling = false
            state.visible = true
			state.open = false
            this.setState(state)
			setTimeout(() => {
				this.setState({open: true})
			}, 1400)
        },2000)
    }

    closeShow() {
        this.setState({visible: false,thx: false})
    }

    rule() {
        this.setState({ruleVisible: true})
    }

    closeRule() {
        this.setState({ruleVisible: false})
    }

    render() {
        let { ruleVisible, rolling, visible, runout, count, winners } = this.state
        const content = (<span style={{color:'#668CF1',fontSize:'0.3rem'}}>今日抽奖机会已用光</span>);
        const list = winners.map((item, index) => {
            return (
                <li>
                    <span>137*******{index}</span>
                    <span className="fr">抽中8888元抵用金</span>
                </li>
            )
        });
        return (
            <DocumentTitle title="幸运蛋">
                <div className="egg">
                    <div className="egg__title">
                        <button onClick={this.rule.bind(this)}>活动规则></button>
                        <h5>抽吉利蛋,最高抽8888元策略抵用金</h5>
                        <div className="egg__title__p">吉利蛋今日抽取进度</div>
                        <Progress percent={30} showInfo={false} strokeColor="#D36D11"/>
                        <div className="egg__title__p">今日总额度：<span>1000000元</span></div>
                        <div className="egg__title__p">今日剩余额度：<span>45000元</span></div>
                    </div>
                    <div className="egg__subtitle">活动时间：2018.xx.xx-2018.xx.xx</div>
                    <div className="egg__box">
                        <span className={["egg__no1", rolling?"roll_1":null].join(' ')}></span>
                        <span className={["egg__no7", rolling?"roll_7":null].join(' ')}></span>
                        <span className={["egg__no2", rolling?"roll_2":null].join(' ')}></span>
                        <span className={["egg__no3", rolling?"roll_3":null].join(' ')}></span>
                        <span className={["egg__no6", rolling?"roll_6":null].join(' ')}></span>
                        <span className={["egg__no4", rolling?"roll_4":null].join(' ')}></span>
                        <span className={["egg__no5", rolling?"roll_5":null].join(' ')}></span>
                        <span className={["egg__no9", rolling?"roll_9":null].join(' ')}></span>
                        <span className={["egg__no8", rolling?"roll_8":null].join(' ')}></span>
                        <span className={["egg__no10", rolling?"roll_10":null].join(' ')}></span>
                    </div>
                    <Popover content={content} visible={this.state.runout}>
                        <div className="go" >
                            {runout?
                                <button className="unavilable"></button>:
                                <button className="avilable" disabled={this.state.rolling} onClick={this.handleClick.bind(this)}>
                                    <div>GO
                                        <span className="count">({count}次)</span>
                                    </div>
                                </button>}
                        </div>
                    </Popover>
                    <div className="egg__record">
                        <p>中奖记录</p>
                        <div className="egg__record__box">
                            <div className="egg__record__box__ul">
                                <TweenOneGroup
                                    component="ul"
                                    reverseDelay={300}
                                    style={{top:this.state.scroll.top*0.6+'rem',display:this.state.scroll.reTop == -1?'none':'block'}}
                                >
                                    {list}
                                </TweenOneGroup>
                                <TweenOneGroup
                                    component="ul"
                                    reverseDelay={300}
                                    style={{top:this.state.scroll.reTop*0.6+'rem',display:this.state.scroll.top == -1?'none':'block'}}
                                >
                                    {list}
                                </TweenOneGroup>
                            </div>

                        </div>
                    </div>
                    {visible?<EggMark gotit={this.closeShow.bind(this)} thx={this.state.thx} open={this.state.open}/>:null}
                    {ruleVisible?<EggRule close={this.closeRule.bind(this)}/>:null}
                </div>
            </DocumentTitle>
        )
    }
}
export default Egg
module.exports = exports['default']
