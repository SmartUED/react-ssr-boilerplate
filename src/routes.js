import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from 'containers/home'
import About from 'containers/about'
import Count from 'containers/count'

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/about" component={ About } />
    <Route path="/count" component={ Count } />
  </Router>
)
