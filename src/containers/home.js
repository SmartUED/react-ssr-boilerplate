import React, { Component } from 'react'

export default class Home extends Component {
  static async onServerSide ({ data }) {
    data.title = 'Home'
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}
