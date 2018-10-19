import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { Input } from 'antd'
import TweenOne from 'rc-tween-one'
import classnames from 'classnames'
const Search = Input.Search

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
   var d = w.document;
   // ie6,7,8 standard mode
   ret = d.documentElement[method];
   if (typeof ret !== 'number') {
     // quirks mode
     ret = d.body[method];
   }
  }
  return ret
}

class Navigator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      logined: false
    }
  }

  componentDidMount(){
    const scrollTop = parseInt(getScroll(window, true))
    console.log(scrollTop)
  }

  render () {
    const navClass = classnames({
      "blog-masthead": true
    });
    return (
      <TweenOne className={ navClass }>
        <div className='container'>
          <TweenOne style={{display:'inline-block'}} animation={{ x: -60, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}>
            <a className="blog-logo">logo</a>
            <div className="blog-nav">
              <a className="blog-nav-item active" href="/">Home</a>
              <a className="blog-nav-item" href="/explore">Explore</a>
              <a className="blog-nav-item" href="/topic">Topic</a>
              <a className="blog-nav-item" href="/about">About</a>
            </div>
          </TweenOne>
          <TweenOne style={{display:'inline-block'}} animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}>
            <div className="searchBar-input">
              <Search
                  placeholder="搜索感兴趣的话题..."
                  enterButton
                  onSearch={value => console.log(value)}
              />
            </div>
          </TweenOne>
        </div>
      </TweenOne>
    )
  }
}

export default connect(state => ({
  global: state.global,
  user: state.user
}), dispath => ({
  actions: bindActionCreators(Actions, dispath)
}))(Navigator)
module.exports = exports['default']
