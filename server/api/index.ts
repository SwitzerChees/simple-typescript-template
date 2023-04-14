import { Request, Response, Express } from 'express'

export const loadAPI = (app: Express) => {
  app.get('/hello', sayHello)
}

const sayHello = (req: Request, res: Response) => {
  res.send('Hello There!')
}
