import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization
      const [, token] = authHeader.split(' ')
      verify(token, process.env.ACCESS_TOKEN_SECRET)
      const { sub } = decode(token)
      request.userId = sub.toString()

      return next()
    } catch (error) {
      console.log(error)
      return response.sendStatus(401)
    }
  }
}
