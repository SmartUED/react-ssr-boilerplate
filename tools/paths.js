const path = require('path')

function resolvePath (relativePath) {
  return path.resolve(__dirname, '..', relativePath)
}

function ensureSlash (path, needsSlash) {
  const hasSlash = path.endsWith('/')

  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return path + '/'
  } else {
    return path
  }
}

module.exports = {
  main:        resolvePath('index.js'),
  build:       resolvePath('.build'),
  src:         resolvePath('src'),
  serverEntry: resolvePath('src/entry.server.js'),
  clientEntry: resolvePath('src/entry.client.js'),
  template:    resolvePath('src/index.html'),
  nodeModules: resolvePath('node_modules'),
  publicUrl:   ensureSlash('/', true)
}
