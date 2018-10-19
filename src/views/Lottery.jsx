import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'
import Api from '../constants/Api'
import ApiCaller from '../utils/ApiCaller'
import Cookie from '../utils/Cookie'
import Runtime from '../utils/Runtime'
import { TweenOneGroup } from 'rc-tween-one';
import Congratulation from "../components/Congratulation"
import PrizeList from '../components/PrizeList'
import Prizes from '../components/Prizes'
import bgImage_second from '../assets/images/springFestival/bg_2.png'
const domain = Runtime.getDomain()
var navigator = {}

class Lottery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switch: false,
            times: 5,
            showOn: false,
            showDialog: false,
            showList: false,
            showPrizes: false,
            prizeInfo: {
                type: '',
                prizeName: ''
            },
            disablebtn: false,
            ring: false,
            winListData: [],
            scroll: {
                top: 0,
                reTop: 6,
            },
            winListScrollFlag: true,
        }
        this.listInterve = null,
        this.winListInterve = null
    }

    componentDidMount() {
        navigator = this.getExplorerInfo()
        this.isOn()
        this.setScrollList()
        setInterval(() => {
            clearInterval(this.winListInterve)
            this.fetchWinList()
        },120000)
    }

    componentWillUnmount(){
        clearInterval(this.listInterve)
        clearInterval(this.winListInterve)
    }

    getExplorerInfo() {
        var ua = window.navigator.userAgent.toLowerCase();
        var rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var match = rMsie.exec(ua);
        if(match != null){
            return { browser : "IE", version : match[2] || "0" };
        }
        var match = rFirefox.exec(ua);
        if (match != null) {
            return { browser : match[1] || "", version : match[2] || "0" };
        }
        var match = rOpera.exec(ua);
        if (match != null) {
            return { browser : match[1] || "", version : match[2] || "0" };
        }
        var match = rChrome.exec(ua);
        if (match != null) {
            return { browser : match[1] || "", version : match[2] || "0" };
        }
        var match = rSafari.exec(ua);
        if (match != null) {
            return { browser : match[2] || "", version : match[1] || "0" };
        }
        if (match != null) {
            return { browser : "", version : "0" };
        }
    }

    //抽奖开关
    isOn() {
        ApiCaller.call(Api.activity.switchOn,{type: 1},(res)=> {
            const state = this.state
            if(res.data.isOpen == 0) {
                state.showOn = true
                state.disablebtn = true
                this.setState(state)
            }else if(res.data.isOpen == 1) {
                this.getTimes()
                this.fetchWinList()
            }
        })
    }

    //获取抽奖次数
    getTimes() {
        ApiCaller.call(Api.activity.surplusCount,{},(res)=> {
            const state = this.state
            if(res.code == 0) {
                state.times = res.data.count
                this.setState(state)
            }
        })
    }

    fetchWinList() {
        ApiCaller.call(Api.activity.prizeUserList,{},(res) => {
            const state = this.state
            if(res.code == 0){
                state.winListData = res.data
                this.setState(state)
            }
        })
    }

    handleScroll(){
        const state = this.state
        if(state.winListData.length <= 6 || !state.winListScrollFlag){
            return
        }
        if(state.scroll.top <= 0){
            state.scroll.top += -1
            state.scroll.reTop = state.scroll.top + state.winListData.length
            if(state.scroll.reTop == -1){
                // 替换
                state.scroll.top = state.scroll.reTop + state.winListData.length
            }
        }else if(state.scroll.reTop <= 0){
            state.scroll.reTop += -1
            state.scroll.top = state.scroll.reTop + state.winListData.length
            if(state.scroll.top == -1){
                // 替换
                state.scroll.reTop = state.scroll.top + state.winListData.length
            }
        }
        this.setState(state)
    }

    setScrollList(){
        const handleScroll = this.handleScroll.bind(this)
        this.listInterve = setInterval(() => {
            handleScroll()
        },2000)
    }

    //获取指定区间范围随机数
    randomFrom(lowerValue,upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }

    //抽奖
    go() {
        const state = this.state
        if(navigator.browser == 'IE' && navigator.version != 10.0 && navigator.version != 11.0) {
            alert('当前ie版本过低，推荐使用chrome浏览器...')
            return
        }
        if(this.state.times < 1) {
            alert("次数已用完");
            return
        }
        ApiCaller.call(Api.activity.playLottery,{},(res) => {
            if(res.code == 0) {
                state.prizeInfo.prizeName = res.data.prize
                let lowerdeg = 0
                let upperdeg = 0
                switch (res.data.type)
                {
                    case 0:         //祝福语
                        lowerdeg = 5
                        upperdeg = 55
                        state.prizeInfo.type = 1
                        break
                    case 1:         //18
                        lowerdeg = 305
                        upperdeg = 355
                        state.prizeInfo.type = 2
                        break
                    case 2:         //38
                        lowerdeg = 245
                        upperdeg = 295
                        state.prizeInfo.type = 2
                        break
                    case 3:         //88
                        lowerdeg = 185
                        upperdeg = 235
                        state.prizeInfo.type = 2
                        break
                    case 4:         //188
                        lowerdeg = 125
                        upperdeg = 175
                        state.prizeInfo.type = 2
                        break
                    case 5:         //实物
                        lowerdeg = 65
                        upperdeg = 115
                        state.prizeInfo.type = 3
                        state.prizeInfo.prizeName = res.data.prize
                        break
                }
                this.setState(state)
                this.rotate(this.randomFrom(lowerdeg,upperdeg))
            }else if(res.code == -2) {
                const cookieOptions = {
                    path: '/',
                    domain: Runtime.getDomain()
                }
                Cookie.remove('uid', cookieOptions)
                Cookie.remove('sid', cookieOptions)
                Cookie.remove('userType', cookieOptions)
                alert('请重新登录...')
                return
            }else {
                this.rotate(this.randomFrom(5,55))
            }
        })
    }

    //旋转
    rotate(deg) {
        let rotdeg = 2520 + deg
        const thiz = this
        const state = this.state
        this.state.disablebtn = true
        this.setState(state)
        var keyFrames = '@-webkit-keyframes rotation {'+
            'from {-webkit-transform: rotate(0deg);}'+
            'to {-webkit-transform: rotate('+rotdeg+');}}'+
                        '@-moz-keyframes rotation {'+
            'from {-moz-transform: rotate(0deg);}'+
            'to {-moz-transform: rotate('+rotdeg+');}}'+
                        '@keyframes rotation {'+
            'from {transform: rotate(0deg);}'+
            'to {transform: rotate('+rotdeg+');}}'
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style)
        document.getElementById('luckytab').style.cssText='-webkit-transform: rotate('+rotdeg+'deg);-moz-transform: rotate('+rotdeg+'deg);-ms-transform: rotate('+rotdeg+'deg);-o-transform: rotate('+rotdeg+'deg);transform: rotate('+
                rotdeg+'deg);-webkit-animation: rotation 8.25s cubic-bezier(.43,.03,.25,1);-moz-animation: rotation 8.25s cubic-bezier(.43,.03,.25,1);animation: rotation 8.25s cubic-bezier(.43,.03,.25,1)'

        const turnSetInter = setInterval(() => {
            thiz.setTurnring()
        },500)
        const turnSetTime = setTimeout(() => {
            thiz.showDialog()
            clearInterval(turnSetInter)
        },8500)
    }

    //外圈
    setTurnring() {
        const state = this.state
        this.state.ring = !this.state.ring
        this.setState(state)
    }

    //恭喜中奖
    showDialog() {
        this.setState({
            showDialog: true
        })
    }

    close() {
        document.getElementById('luckytab').style.cssText = ''
        var head = document.getElementsByTagName('head')[0]
        head.removeChild(head.lastChild)
        this.setState({
            showDialog: false,
            disablebtn: false,
        })
        document.body.style.overflow = ''
        // 调用子组件更新名单，第一页
        this.refs.getPrizeList.getPrizeList(1)
        this.isOn()
    }

    //显示我的中奖纪录
    showList() {
        const state = this.state
        state.showList = true
        this.setState(state)
    }
    closeList() {
        this.setState({
            showList: false
        })
        document.body.style.overflow = ''
    }
    //显示奖品列表
    showPrizes() {
        this.setState({
            showPrizes: true
        })
    }
    closePrizes() {
        this.setState({
            showPrizes: false
        })
    }

    render() {
        const winList = this.state.winListData.map((item,index) => {
            return (
                <li>
                    <img src={item.headImage} style={{width: 40,height: 40,borderRadius: 30,display: 'inline-block',float: 'left'}}/>
                    <span className="phone">{item.userName}</span>
                    {item.type == 5 ? <span className="goods">{item.prize}</span> : <span className="goods">{item.prize}元红包</span>}
                </li>
            )
        })

        return (
            <div className="lottery">
                <div className="bg_second" style={{backgroundImage:'url('+bgImage_second+')'}}></div>
                <div className="wid1200">
                    <div className="dial">
                        <div className={this.state.ring?'ring circle1':'ring circle'}>
                            <img id="luckytab" src={require('../assets/images/springFestival/dial.png')} />
                            <span className="arrow">
                                <button className="go" onClick={this.go.bind(this)} disabled={this.state.disablebtn?'disabled':''}></button>
                            </span>
                        </div>
                    </div>
                    <div className="list">
                        <div className="content">
                            <TweenOneGroup
                                animation={{ y: '+=54', opacity: 0,}}
                                className='awardList'
                                component="ul"
                                reverseDelay={300}
                                style={{ top:this.state.scroll.top * 54,display:this.state.scroll.reTop == -1 ? 'none' : 'block' }}
                            >
                                {winList}
                                <li className={this.state.winListData.length == 0 ? "empty" : "hide"}>暂无数据</li>
                            </TweenOneGroup>
                            <TweenOneGroup
                                animation={{ y: '+=54', opacity: 0,}}
                                className='awardList'
                                component="ul"
                                reverseDelay={300}
                                style={{ top:this.state.scroll.reTop * 54,display:this.state.scroll.top == -1 ? 'none' : 'block' }}
                            >
                                {winList}
                                <li className={this.state.winListData.length == 0 ? "empty" : "hide"}>暂无数据</li>
                            </TweenOneGroup>
                        </div>
                        <div className="checkBtn" onClick={this.state.disablebtn?'':this.showList.bind(this)}>查看我的中奖纪录</div>
                        <div className="awardTip" onClick={this.state.disablebtn?'':this.showPrizes.bind(this)}>奖品列表></div>
                    </div>
                    <div className="drawtime">
                        <span>今日剩余<em>{this.state.times}</em>次抽奖机会</span>
                    </div>
                </div>
                <Congratulation showDialog={this.state.showDialog} prizeInfo={this.state.prizeInfo} close={this.close.bind(this)}/>
                <PrizeList ref="getPrizeList" showList={this.state.showList} closeList={this.closeList.bind(this)}/>
                <Prizes showPrizes={this.state.showPrizes} closePrizes={this.closePrizes.bind(this)}/>
            </div>
        )
    }
}

export default connect(state => ({
    global: state.global,
    user: state.user
}), dispath => ({
    actions: bindActionCreators(Actions, dispath)
}))(Lottery)
module.exports = exports['default']