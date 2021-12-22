import { Request, Response, NextFunction } from 'express'
import { AppError } from '@config/AppError'
import { jwtVerify } from '@config/jwt'

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    throw new AppError('token.invalid', 401)
  }

  const [, token] = authToken.split(' ')

  try {
    const sub = jwtVerify(token)

    request.user_id = sub

    return next()
  } catch (err) {
    throw new AppError('token.expired', 401)
  }
}
