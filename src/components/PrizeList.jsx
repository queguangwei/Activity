import React from 'react';
import Api from '../constants/Api'
import ApiCaller from '../utils/ApiCaller'
import close from '../assets/images/springFestival/close.png'
import prizeList from '../assets/images/springFestival/myprizes.png'

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

class PrizeList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            myPrizeList:[],       // 中奖列表
            currPage: 1,          // 页码
            totalPageCount: 0,
            isLast: false        // 是否是最后一页
        }
    }

    componentDidMount() {
        this.getPrizeList(this.state.currPage)
    }

    handleClose() {
        this.setState({
            currPage: 1,
            isLast: true
        })
        this.getPrizeList(1)
        this.props.closeList()
    }

    getPrizeList(page) {
        const state = this.state
        const params = {
            pageSize: 6,
            currPage: page
        }
        ApiCaller.call(Api.activity.myPrizeRecond,params,(res) => {
            if(res.code == 0){
                state.myPrizeList = res.data.items
                state.totalPageCount = res.data.totalPageCount
                if(!res.data.totalCount){
                    state.isLast = true
                }
                if (res.data.totalPageCount === res.data.currentPage) {
                    state.isLast = true
                }else {
                    state.isLast = false
                }
                this.setState(state)
            }
        })
    }

    prevPage() {
        const state = this.state
        if (state.currPage == 1) {
            console.log('没有上一页')
        } else {
            state.currPage -= 1
            this.getPrizeList(state.currPage)
            state.isLast = false
            this.setState(state)
        }
    }

    nextPage() {
        const state = this.state
        if (!state.isLast) {
            state.currPage += 1
            this.getPrizeList(state.currPage)
            this.setState(state)
        } else {
            console.log('没有下一页')
        }
    }

    render() {
        if (this.props.showList) {
            document.body.style.overflow = 'hidden'
        }
        const myPrizeList = this.state.myPrizeList.length > 0 ? this.state.myPrizeList.map((item,index) => {
            return (
                <tr>
                    {item.type == 5 ? <td className="red">{item.prize}</td> : <td className="red">{item.prize}元红包</td>}
                    <td>转盘抽奖</td>
                    <td>{item.createTime}</td>
                </tr>
            )
        }) : <div className="no-data">暂无奖品</div>
        return (
            this.props.showList ?
                <div>
                    <div className="prizeList" style={{backgroundImage:'url(' + prizeList + ')'}}>
                        <div className="prizeList_closebtn" onClick={this.handleClose.bind(this)} style={{backgroundImage:'url(' + close + ')'}} ></div>
                        <table className="prizeTable">
                            <thead>
                                <th>奖品名</th>
                                <th>来源</th>
                                <th>时间</th>
                            </thead>
                            <tbody>
                                {myPrizeList}
                            </tbody>
                        </table>
                        {
                            this.state.totalPageCount == 0 ? <div className="prizeList_pageNum">0/0</div> : <div className="prizeList_pageNum">{this.state.currPage+'/'+this.state.totalPageCount}</div>

                        }
                        <div className="prizeList_btn" onClick={this.handleClose.bind(this)}>确定</div>
                        <div className="prevbtn" onClick={this.prevPage.bind(this)}>上一页</div>
                        <div className="nextbtn" onClick={this.nextPage.bind(this)}>下一页</div>
                    </div>
                    <Mark/>
                </div>
                : null
        )
    }
}

export default PrizeList

module.exports = exports['default']
