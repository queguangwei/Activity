import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../store/actions'
import { bindActionCreators } from 'redux'

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
      return (
        <div>
          {this.props.children}
        </div>
    )
  }
}

export default connect(state => ({
  global: state.global,
  user: state.user
}), dispath => ({
  actions: bindActionCreators(Actions, dispath)
}))(App)
module.exports = exports['default']
