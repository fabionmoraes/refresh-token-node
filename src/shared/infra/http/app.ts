import 'reflect-metadata'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'

import http from 'http'
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'

import { routes } from './routes'
import { AppError } from '@config/AppError'

import '../../../main'

const app = express()

app.use(cors())

const serverHttp = http.createServer(app)

app.use(express.json())
app.use(routes)
app.use(errors())

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }

    console.error(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
)

export { serverHttp }
