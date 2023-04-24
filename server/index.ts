import express, { Request, Response } from 'express'
import connectLiveReload from 'connect-livereload'
import livereload from 'livereload'
import { API } from './api'
import http from 'http'
import { resolve, dirname } from 'path'

const __dirname = resolve(dirname(''))

const app = express()

const api = new API(app)

// create a livereload server
const env = process.env.NODE_ENV || 'development'
if (env !== 'production') {
  const liveReloadServer = livereload.createServer()
  liveReloadServer.watch(__dirname + '/client')
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/')
    }, 100)
  })
  // use livereload middleware
  app.use(connectLiveReload())
}

// deliver static files from the client folder like css, js, images
app.use(express.static('client'))

// route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})

if (env === 'production') {
  http.createServer(app).listen(3000, () => {
    console.log('Server is listening!')
  })
}

export const viteNodeApp = app
