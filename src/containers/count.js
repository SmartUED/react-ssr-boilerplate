import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as countActionCreators from 'actions/count'

class Count extends Component {
  static async onServerSide ({ data, store }) {
    data.title = 'Count'
    await store.dispatch(countActionCreators.asyncAdd(10))
  }

  render () {
    return (
      <div>
        <h1>Count</h1>
        <p>{ this.props.count }</p>
        <div>
          <button onClick={ () => this.props.countAction.add(1) }>add</button>
          <button onClick={ () => this.props.countAction.sub(1) }>sub</button>
          <button onClick={ () => this.props.countAction.asyncAdd(5) }>asyncAdd</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    count: state.count
  }),
  dispatch => ({
    countAction: bindActionCreators(countActionCreators, dispatch)
  })
)(Count)
