import mysql from 'mysql2/promise'
import { USER_TABLE, TWEET_TABLE } from './schema'

export class Database {
  // Properties
  private _pool: mysql.Pool

  // Constructor
  constructor() {
    this._pool = mysql.createPool({
      database: process.env.DB_NAME || 'minitwitter',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }

  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
    await this.executeSQL(USER_TABLE)
    await this.executeSQL(TWEET_TABLE)
  }

  public executeSQL = async (query: string) => {
    let conn: mysql.PoolConnection | undefined
    try {
      conn = await this._pool.getConnection()
      const [results] = await conn.query(query)
      return results
    } catch (err) {
      console.error('Error executing query:', err)
    } finally {
      if (conn) conn.release() // Use `release` instead of `end` to keep the connection in the pool
    }
  }
}
