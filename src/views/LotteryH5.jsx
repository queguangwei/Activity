import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import classnames from 'classnames'
import Api from '../constants/Api'
import ApiCaller from '../utils/ApiCaller'
import Cookie from '../utils/Cookie'
import Runtime from '../utils/Runtime'
import car from '../assets/images/lotteryH5/car.png'
import computer from '../assets/images/lotteryH5/computer.png'
import cooker from '../assets/images/lotteryH5/cooker.png'
import purifier from '../assets/images/lotteryH5/purifier.png'
import razor from '../assets/images/lotteryH5/razor.png'
import iPad from '../assets/images/lotteryH5/ipad.png'
const domain = Runtime.getDomain()

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
                backgroundColor: 'rgba(55,55,55,0.5)',
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

class CongratulatePrize extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            image:[car,razor,purifier,cooker,iPad,computer]
        }
    }
    closeCongratulatePrize() {
        this.props.closeCongratulatePrize()
        document.removeEventListener('touchmove',this.stopMove)
    }
    stopMove(event) {
        event.preventDefault()
        event.stopPropagation()
    }
    mall(name) {
        switch (name) {
            case '行车记录仪':
                return 0
            case '博朗剃须刀':
                return 1
            case '小米空气净化器':
                return 2
            case '小米电饭锅':
                return 3
            case 'iPad':
                return 4
            case '笔记本电脑':
                return 5
            default:
                return 6
        }
    }
    render() {
        if (this.props.showDialog) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('touchmove',this.stopMove)
        }
        const index = Number(this.mall(this.props.prize))
        const flag = this.props.type == 1 || this.props.type == 2 || this.props.type == 3 || this.props.type == 4
        return (
            this.props.showDialog ?
                <div>
                    <div className="congratulate-prize">
                        <div className="congratulate-prize_close" onClick={this.closeCongratulatePrize.bind(this)}></div>
                        <div className={classnames({'congratulate-prize_redEnvelopes':true,'congratulate-prize_show': flag})}>
                            <div className="congratulate-prize_number"><span style={{fontSize:'0.22rem'}}>¥</span><span style={{fontSize:'0.3rem'}}>{this.props.prize}</span></div>
                        </div>
                        <div className={classnames({'congratulate-prize_img':true,'congratulate-prize_show':this.props.type == 5})}>
                            <div className="congratulate-prize_prize">
                                <img src={this.state.image[index]} alt=""/>
                            </div>
                            <div className="congratulate-prize_text">抽中{this.props.prize}</div>
                        </div>
                        <div className={classnames({'congratulate-prize_dog':true,'congratulate-prize_show':this.props.type == 0})}></div>
                        <div className="congratulate-prize_button" onClick={this.closeCongratulatePrize.bind(this)}>确定</div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

class MallShow extends React.Component {
    constructor(props){
        super(props)
    }

    closeMallShow() {
        if (this.props.showDialog) {
            this.props.closeMallShow()
        }
        document.removeEventListener('touchmove',this.stopMove)
    }

    stopMove(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        if (this.props.showDialog) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('touchmove',this.stopMove)
        }
        return (
            this.props.showDialog ?
                <div>
                    <div className="mallShow">
                        <div className="mallShow_close" onClick={this.closeMallShow.bind(this)}></div>
                        <div className="mallShow_button" onClick={this.closeMallShow.bind(this)}>确定</div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

class MyPrize extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            myPrizeList:[],       // 中奖列表
            currPage: 1,          // 页码
            totalPageCount: 0,
            isLast: true        // 是否是最后一页
        }
    }

    componentDidMount() {
        this.getPrizeList(this.state.currPage)
    }

    closeMyPrizeShow() {
        this.setState({
            currPage: 1,
            isLast: true
        })
        this.getPrizeList(1)
        this.props.closeMyPrizeShow()
        document.removeEventListener('touchmove',this.stopMove)
    }

    // 获取当前页码下的中奖信息
    getPrizeList(page) {
        let params = {
            currPage:page,
            pageSize:6
        }
        ApiCaller.call(Api.activity.myPrizeRecond,params,(res) => {
            if (res.code == 0) {
                const state = this.state
                state.myPrizeList = res.data.items
                state.totalPageCount = res.data.totalPageCount
                if(!res.data.totalCount){
                    state.isLast = true
                }
                if (Number(res.data.totalCount)-Number(page)*6 <= 0) {
                    state.isLast = true
                } else {
                    state.isLast = false
                }
                this.setState(state)
            }
        })
    }

    // 获取上一页数据
    upPageData() {
        const state = this.state
        if (state.currPage == 1) {
            console.log('没有上一页')
        } else {
            state.currPage -= 1
            state.isLast = false
            this.getPrizeList(state.currPage)
            this.setState(state)
        }
    }

    // 获取下一页数据,
    downPageData() {
        const state = this.state
        if (!state.isLast) {
            state.isLast = true
            state.currPage += 1
            this.getPrizeList(state.currPage)
            this.setState(state)
        } else {
            console.log('没有下一页')
        }
    }

    stopMove(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        if (this.props.showDialog) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('touchmove',this.stopMove)
        }
        const html = this.state.myPrizeList.length >0 ? this.state.myPrizeList.map((item) => {
            return (
                <li className="my-prize_li">
                    <span className={classnames({'nameSpan': true,'nameSpan-active': item.type == 5})}>{item.type == 5 ? item.prize : `${item.prize}元红包`}</span>
                    <span className="fromSpan">转盘抽奖</span>
                    <span className="timeSpan">{item.createTime.slice(0,11)}</span>
                </li>
            )
        }) : <li className="my-prize_no">暂无奖品</li>
        return (
            this.props.showDialog ?
                <div>
                    <div className="my-prize">
                        <div className="my-prize_close"onClick={this.closeMyPrizeShow.bind(this)}></div>
                        <div className="my-prize_title">
                            <span className="nameSpan">奖品名</span>
                            <span className="fromSpan">来源</span>
                            <span className="timeSpan">时间</span>
                        </div>
                        <ul className="my-prize_ul">
                            {html}
                        </ul>
                        {
                            this.state.totalPageCount == 0 ? <div className="my-prize_pageNum">0/0</div> :
                            <div className="my-prize_pageNum">{this.state.currPage+'/'+this.state.totalPageCount}</div>
                        }
                        <div className="my-prize_button">
                            <span className="span1" onClick={this.upPageData.bind(this)}>上一页</span>
                            <span className="span2" onClick={this.closeMyPrizeShow.bind(this)}>确定</span>
                            <span className="span1" onClick={this.downPageData.bind(this)}>下一页</span>
                        </div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

class Mlottery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star: true,
            msgTimer: null,
            starTimer: null,
            initLate: 0,
            animate:false,            // 是否开启过度效果
            prizeList: [],            // 获奖名单
            count: 5,                 // 剩余抽奖机会
            przieShow: false,        // 中奖弹窗
            mallShow: false,         // 礼品展示弹窗
            myPrizeShow: false,      // 查看我的奖品弹窗
            isOn: 0,                  // 后台提供的开关
            style: {},
            rotate: 3240,
            isClick: true,
            type: '',               // 0:实物 ,1：188红包,2:88红包,3:38红包,4:18元红包 ，5祝福语
            prize: '',              // 奖品信息
        }
    }

    componentDidMount() {
        // 查询活动是否结束
        this.isOn()
        this.getPrizeUser()
        // 登录了获取抽奖次数
        if (Cookie.get('uid')) {
            this.getCount()
        }

    }

    componentWillUnmount() {
        clearInterval(this.state.msgTimer)
    }
    // 获取活动是否开启
    isOn() {
        ApiCaller.call(Api.activity.switchOn, {type: 1}, (res) => {
            if (res.code == 0) {
                this.setState({
                    isOn: res.data
                })
            }
        })
    }
    // 获取剩余中奖次数
    getCount() {-
        ApiCaller.call(Api.activity.surplusCount, {}, (res) => {
            if (res.code == 0) {
                const state = this.state
                state.count = res.data.count
                this.setState({
                    count: state.count
                })
            }
        })
    }

    // 获取中奖名单
    getPrizeUser() {
        ApiCaller.call(Api.activity.prizeUserList,{},(res) => {
            if (res.code == 0) {
                const state = this.state
                state.prizeList = res.data
                this.setState(state)
                this.startScroll()
            }
        })
    }

    // 查看我的中奖记录
    myPrizeRecord() {
        this.setState({
            myPrizeShow: true
        })
    }
    // 关闭我的中奖记录
    closeMyPrizeShow() {
        this.setState({
            myPrizeShow: false
        })
        document.body.style.overflow = ''
    }
    // 展示奖品列表
    showPrizeList() {
        this.setState({
            mallShow:true
        })
    }
    // 关闭奖品列表
    closeMallShow() {
        this.setState({
            mallShow:false
        })
        document.body.style.overflow = ''
    }
    startStar() {
        const that = this
        that.state.starTimer = setInterval(() => {
            that.setState({
                star:!that.state.star
            })
        }, 300)
    }

    msgScroll() {
        // 0.64rem是一个移动单位,开始第一次变化
        const state = this.state
        state.initLate = -0.64
        state.animate = !state.animate
        this.setState(state)
        // 变化第二次,要防止异步函数出现this偏移
        const that = this
        setTimeout(() => {
            that.state.prizeList.push(that.state.prizeList[0])
            that.state.prizeList.shift()
            that.state.initLate = 0
            that.state.animate = !that.state.animate
            that.setState(that)
        }, 1000)
    }
    startScroll() {
        const state = this.state
        state.msgTimer = setInterval(() => {
            this.msgScroll()
        }, 3000)
        this.setState({
            msgTimer:state.msgTimer
        })
    }

    // 点击抽奖按钮
    startLottery() {
        const state = this.state
        if (state.isClick) {
            if (state.count != 0) {
                this.setState({
                    count:this.state.count - 1,
                    isClick: false,
                })
                ApiCaller.call(Api.activity.playLottery,{},(res) => {
                    if (res.code == 0) {
                        this.startStar()
                        this.startTurn(res.data.type, res.data.prize)
                        this.getCount()
                    } else {
                        // all error show congratulate
                        this.startStar()
                        this.startTurn(0, '')
                        this.getCount()
                    }
                })
            } else {
                this.setState({
                    countShow: true
                })
            }
        } else {
            console.log('等待本次抽奖结束')
        }
    }

    // 对应关系
    rotate(type) {
        switch (type) {
            case 5:
                return 90
            case 4:
                return 150
            case 3:
                return 210
            case 2:
                return 270
            case 1:
                return 330
            case 0:
                return 30
            default:
                return 30
        }
    }

    startTurn(type,prize) {
        this.turnAnimate(type, prize)
    }

    // 旋转动画
    turnAnimate(type,prize) {
        const state = this.state
        let reg = Number(state.rotate) + Number(this.rotate(type))
        this.setState({
            style: {
                'transition': 'all 5s ease-in-out',
                '-ms-transition': 'all 5s ease-in-out',
                '-moz-transition': 'all 5s ease-in-out',
                '-webkit-transition': 'all 5s ease-in-out',
                '-o-transition': 'all 5s ease-in-out',
                'transform':  'rotate(' + reg + 'deg)',
                '-ms-transform': 'rotate(' + reg + 'deg)',
                '-moz-transform': 'rotate(' + reg + 'deg)',
                '-webkit-transform': 'rotate(' + reg + 'deg)',
                '-o-transform': 'rotate(' + reg + 'deg)',
            }
        })
        setTimeout(() => {
            clearInterval(state.starTimer)
            this.setState({
                isClick: true,
                przieShow: true,
                type:type,
                prize:prize,
                style: {}
            })
            this.isOn()
        }, 5200)
    }

    // 关闭中奖显示
    closeCongratulatePrize() {
        this.setState({
            przieShow:false
        })
        document.body.style.overflow = ''
        // 调用子组件更新名单，第一页
        this.refs.getPrizeList.getPrizeList(1)
    }

    render() {
        // 制造闪灯效果
        let starClass = classnames({
            'container_outer':true,
            'container_default-img': this.state.star,
            'container_active-img': !this.state.star
        })

        // 中奖名单
        const html = this.state.prizeList.map((item) => {
            return (
                <li className="container_li">
                    <div className="img">
                        <div className="user-img">
                            <img src={item.headImage} alt=""/>
                        </div>
                        <div className="user-name">{item.userName}</div>
                    </div>
                    <div className="prize">{item.type == 5 ? item.prize : `${item.prize}元红包`}</div>
                </li>
            )
        })
        return (
            <DocumentTitle title="转盘">
                <div className="container" id="container">
                    <div className="container_bottom"></div>
                    <div className="container_up">
                        <div className={starClass}>
                            <div className="container_inner" style={this.state.style}></div>
                            <div className="container_start" onClick={this.startLottery.bind(this)}></div>
                        </div>
                        <div className="container_count">
                            <div className="text">
                                今日剩余<span>{this.state.count}</span>次抽奖机会
                            </div>
                        </div>
                        <div className="container_scroll">
                            <div className="container_roll">
                                <div className="title">中奖名单</div>
                                <div className="container_ul">
                                    <ul className={classnames({'container_animate':this.state.animate})} style={{transform:`translate3d(0, ${this.state.initLate}rem, 0)`}}>
                                        {html}
                                    </ul>
                                </div>
                                <div className="button" onClick={this.myPrizeRecord.bind(this)}>查看我的中奖纪录</div>
                            </div>
                        </div>
                        <div className="container_prizeList" onClick={this.showPrizeList.bind(this)}>奖品列表></div>
                    </div>
                    <div className="container_bottom"></div>
                    <CongratulatePrize showDialog={this.state.przieShow} prize={this.state.prize} type={this.state.type} closeCongratulatePrize={this.closeCongratulatePrize.bind(this)} />
                    <MallShow showDialog = {this.state.mallShow} closeMallShow={this.closeMallShow.bind(this)}/>
                    <MyPrize ref="getPrizeList"  showDialog = {this.state.myPrizeShow} closeMyPrizeShow={this.closeMyPrizeShow.bind(this)}/>
                </div>
            </DocumentTitle>
        )
    }
}

export default Mlottery
module.exports = exports['default']