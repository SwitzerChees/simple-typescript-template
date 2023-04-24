import { Request, Response, Express } from 'express'

export class API {
  app: Express
  constructor(app: Express) {
    this.app = app
    this.app.get('/hello', this.sayHello)
  }

  public sayHello(req: Request, res: Response) {
    res.send('Hello There!')
  }
}
