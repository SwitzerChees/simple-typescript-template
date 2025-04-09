import { Request, Response, Express } from 'express'
import { Database } from '../database'

export class API {
  // Properties
  private _app: Express
  private _database: Database
  // Constructor
  constructor(app: Express, database: Database) {
    this._app = app
    this._database = database

    this._app.get('/hello', this.sayHello)
  }
  // Methods
  private sayHello(req: Request, res: Response) {
    res.send('Hello There!')
  }
}
