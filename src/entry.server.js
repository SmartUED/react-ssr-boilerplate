import 'isomorphic-fetch'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store'

export default function (template) {
  return function (req, res, next) {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        next(err)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        handleRender(
          req,
          res,
          next,
          template,
          renderProps
        )
      } else {
        next()
      }
    })
  }
}

function handleRender (
  req,
  res,
  next,
  template,
  renderProps
) {
  const store = configureStore()
  const data = new Object()

  const preloads = renderProps.components
    .filter(c => c && typeof c.onServerSide === 'function')
    .map(c => c.onServerSide)

  const processPreloads = async function processPreloads () {
    for (const func of preloads) {
      if (res.headersSent) { return }

      await func({
        req,
        res,
        store,
        data,
        params: renderProps.params,
        location: renderProps.location
      })
    }
  }

  processPreloads()
  .then(() => {
    if (!res.headersSent) {
      res.send(template({
        data,
        state: store.getState(),
        react: renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        )
      }))
    }
  })
  .catch(err => next(err))
}
