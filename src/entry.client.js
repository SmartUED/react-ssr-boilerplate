import 'normalize.css'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store'

const store = configureStore(__INITIAL_STATE__)

render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('root')
)
