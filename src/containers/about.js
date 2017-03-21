import React, { Component } from 'react'
import Example from 'components/about/example'

export default class About extends Component {
  static async onServerSide ({ data }) {
    data.title = 'About Me'
  }

  render () {
    return (
      <div>
        <h1>About</h1>
        <Example />
      </div>
    )
  }
}
