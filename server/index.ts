import express, { Request, Response } from 'express'
import ViteExpress from 'vite-express'
import { loadAPI } from './api'

const app = express()

loadAPI(app)

app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'client' })
})

export const viteNodeApp = app

if (process.env.NODE_ENV === 'production') {
  ViteExpress.listen(app, 3000, () => console.log('Server is listening...'))
}
