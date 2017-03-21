'use strict'

const fs            = require('fs')
const path          = require('path')
const express       = require('express')
const morgan        = require('morgan')
const ejs           = require('ejs')
const renderHandler = require('./.build/renderHandler').default

const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '.build/index.html'), 'utf8'))
const app = express()

app.use(express.static(path.resolve(__dirname, '.build'), { index: false }))
app.use(morgan('common'))

// render React
app.use(renderHandler(template))

// 404
app.use((req, res, next) => res.status(404).send('Not Found'))

// 500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

app.listen(3000, () => console.log('\n🚀  空间曲率已校对 [3000] 开始跃迁...\n'))
