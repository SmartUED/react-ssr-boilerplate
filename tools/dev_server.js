'use strict'

const paths          = require('./paths')
const fork           = require('child_process').fork
const chokidar       = require('chokidar')
const webpack        = require('webpack')
const ServerConfig   = require('./webpack.server.js')
const ClientConfig   = require('./webpack.client.js')

const ServerCompiler = webpack(ServerConfig)
const ClientCompiler = webpack(ClientConfig)

let devServer = null

function compile (compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) { throw err }
      resolve(stats)
    })
  })
}

function reloadAll () {
  return Promise.all([compile(ClientCompiler), compile(ServerCompiler)])
          .then(stats => {
            stats.forEach(s => {
              console.log(s.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
              }))
            })
          })
          .then(() => reloadServer())
}

function reloadServer () {
  if (devServer) { devServer.kill() }

  devServer = fork(paths.main)
}

chokidar.watch([paths.src])
.on('ready', () => {
  console.log('\n⚒  Watcher is Ready, Building...\n')
  reloadAll()
})
.on('change', path => {
  console.log(`\n⚒  ${path}, Rebuilding...\n`)
  reloadAll()
})
