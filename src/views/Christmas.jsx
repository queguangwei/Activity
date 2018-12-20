import React, { Component } from 'react'
import { Progress, Popover, Icon } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import Api from '../constants/Api'
import ApiCaller from '../utils/ApiCaller'
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
				<Icon type="close-circle" className="closeCircle" style={{fontSize:30,color:'#fff'}} onClick={this.handleClose.bind(this)}/>
				<article className="rule">
					<h3>活动规则</h3>
					<span>活动时间：2018-12-xx至2019-01-xx</span>
					<p>1、活动期间每个账户每日有3次抽奖机会。</p>
					<p>2、xxx自获取之日起7日内有效。</p>
					<p>3、每笔仅限使用1笔xxx，xxx不可提现。</p>
					<p>4、xxx不可与现金红包同时使用。</p>
					<p>5、每日xxx活动金额有限，先到先得。</p>
					<p>6、如有其它疑问，请咨询x客服。</p>
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

	touse() {
		this.props.touse()
	}

	render() {
		const gold = this.props.gold
		const threshold = this.props.threshold
		return (
			<div className="gift">
				<div className="upper scaleUp">
					{gold == '谢谢惠顾' || gold == '再来一次' ?
						<div className="gift__thx">
							<p className="gift__thx__title">{gold=='谢谢惠顾'?'手慢一步, 没抢到哦':'抽中圣诞礼盒啦'}</p>
							<p className="gift__thx__subtitle">{gold=='谢谢惠顾'?'谢谢惠顾':'再来一次'}</p>
							<span>{gold=='谢谢惠顾'?'换个姿势抽奖可能会有惊喜哦':'抽奖次数+1哦'}</span>
						</div> :
						<div className="gift__win">
							<p className="gift__win__title">抽中圣诞礼盒啦</p>
							<span>抵用金</span>
							<p className="gift__win__amount">{gold}.00元</p>
							<span className="gift__win__direction">
								<p>满{threshold}元信用金可用</p>
                        	</span>
						</div>}
					<div className="gift__button">
						<button className="gotit" onClick={this.gotit.bind(this)}>{(gold=='谢谢惠顾'||gold=='再来一次')?'知道了':'收下了'}</button>
						<button onClick={this.touse.bind(this)}>使用抵用金</button>
					</div>
				</div>
			</div>
		)
	}
}

class ChristmasMask extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="mask">
			</div>
		)
	}
}

class Christmas extends Component {
	constructor (props) {
		super(props)
		this.timer = null,
			this.state = {
				tip: true,
				mask: false,
				ruleVisible: false,
				rolling1: false,
				rolling2: false,
				rolling3: false,
				rolling4: false,
				rolling5: false,
				rolling6: false,
				rolling7: false,
				rolling8: false,
				rolling9: false,
				visible: false,
				over: false,
				runout: false,
				count: 3,
				winners: [],
				scroll: {
					top: 0,
					reTop: 6,
				},
				progress: {},
				thx: false
			}
	}

	componentDidMount() {
		this.getWinners()
		setTimeout(() => {
			this.setState({tip: false})
		}, 2000)
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
			if(state.scroll.reTop == -1){
				// 替换
				state.scroll.top = state.scroll.reTop + state.winners.length
			}
		}else if(state.scroll.reTop <= 0){
			state.scroll.reTop += -1
			state.scroll.top = state.scroll.reTop + state.winners.length
			if(state.scroll.top == -1){
				// 替换
				state.scroll.reTop = state.scroll.top + state.winners.length
			}
		}
		this.setState(state)
	}

	handleClick (gift) {
		const state = this.state
		if (state.count == 0) {
			return false
		}
		switch (gift){
			case 1:
				state.rolling1 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling1 = false
					state.mask = false
				},1000)
				break
			case 2:
				state.rolling2 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling2 = false
					state.mask = false
				},1000)
				break
			case 3:
				state.rolling3 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling3 = false
					state.mask = false
				},1000)
				break
			case 4:
				state.rolling4 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling4 = false
					state.mask = false
				},1000)
				break
			case 5:
				state.rolling5 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling5 = false
					state.mask = false
				},1000)
				break
			case 6:
				state.rolling6 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling6 = false
					state.mask = false
				},1000)
				break
			case 7:
				state.rolling7 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling7 = false
					state.mask = false
				},1000)
				break
			case 8:
				state.rolling8 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling8 = false
					state.mask = false
				},1000)
				break
			case 9:
				state.rolling9 = true
				state.mask = true
				setTimeout(()=>{
					state.rolling9 = false
					state.mask = false
				},1000)
				break
		}
		state.count = state.count - 1
		this.setState(state)
		setTimeout(()=>{
			if(state.count == 0){
				state.runout = true
			}
			state.visible = true
			this.setState(state)
		},1000)
	}

	closeShow() {
		this.setState({visible: false})
	}

	create() {

	}

	rule() {
		this.setState({ruleVisible: true})
	}

	closeRule() {
		this.setState({ruleVisible: false})
	}

	render() {
		let { mask, ruleVisible, visible, runout, count, winners, progress } = this.state;
		const content = (<span style={{color:'#668CF1',fontSize:'0.3rem'}}>今日抽奖机会已用光</span>);
		const over = (<span style={{color:'#668CF1',fontSize:'0.3rem'}}>活动已结束，感谢参与</span>);
		const list = winners.map((item, index) => {
			return (
				<li>
					<span>137*******{index}</span>
					<span className="fr">抽中8888元抵用金</span>
				</li>
			)
		});
		return (
			<DocumentTitle title="圣诞礼盒">
				<div>
					<div className="christmas">
						<div className="christmas__title">
							<button onClick={this.rule.bind(this)}>活动规则></button>
							<h5>拆圣诞礼盒,最高抽8888元策略抵用金</h5>
							<div className="christmas__title__p">圣诞礼盒今日抽取进度</div>
							<Progress percent={40} showInfo={false}/>
							<div className="christmas__title__p">今日总额度：<span>1000000元</span></div>
							<div className="christmas__title__p">今日剩余额度：<span>40000元</span></div>
						</div>
						<div className="christmas__box">
							<Popover placement="rightTop" visible={this.state.tip} content="点击礼盒抽奖哦">
							<span className={["christmas__gift__no1", this.state.rolling1?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 1)}></span>
							</Popover>
							<span className={["christmas__gift__no2", this.state.rolling2?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 2)}></span>
							<span className={["christmas__gift__no3", this.state.rolling3?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 3)}></span>
							<span className={["christmas__gift__no4", this.state.rolling4?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 4)}></span>
							<span className={["christmas__gift__no5", this.state.rolling5?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 5)}></span>
							<span className={["christmas__gift__no6", this.state.rolling6?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 6)}></span>
							<span className={["christmas__gift__no7", this.state.rolling7?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 7)}></span>
							<span className={["christmas__gift__no8", this.state.rolling8?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 8)}></span>
							<span className={["christmas__gift__no9", this.state.rolling9?"rolling":null].join(' ')} onClick={this.handleClick.bind(this, 9)}></span>
						</div>
						<Popover content={this.state.over?over:content} visible={runout}>
							<div className="go">
								<button className="avilable" onClick={this.handleClick.bind(this)}>剩余{count}次</button>
							</div>
						</Popover>
						<div className="christmas__record">
							<div className="christmas__record__box">
								<div className="christmas__record__box__ul">
									<TweenOneGroup
										component="ul"
										reverseDelay={300}
										style={{top:this.state.scroll.top*0.5+'rem',display:this.state.scroll.reTop == -1?'none':'block'}}
									>
										{list}
									</TweenOneGroup>
									<TweenOneGroup
										component="ul"
										reverseDelay={300}
										style={{top:this.state.scroll.reTop*0.5+'rem',display:this.state.scroll.top == -1?'none':'block'}}
									>
										{list}
									</TweenOneGroup>
								</div>

							</div>
						</div>
						{visible?<EggMark gotit={this.closeShow.bind(this)} touse={this.create.bind(this)} gold={this.state.gold} threshold={this.state.threshold}/>:null}
						{ruleVisible?<EggRule close={this.closeRule.bind(this)}/>:null}
						{mask?<ChristmasMask/>:null}
					</div>
				</div>
			</DocumentTitle>
		)
	}
}
export default Christmas
module.exports = exports['default']
