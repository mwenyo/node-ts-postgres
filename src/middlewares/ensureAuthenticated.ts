import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../repositories/index'

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization
      const [, token] = authHeader.split(' ')
      verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err || !decoded.sub) return response.status(401).json({ Error: 'Invalid credentials' })
        const foundUser = await UserRepository().findOne({ id: decoded.sub.toString() })
        request.userId = foundUser.id
        return next()
      })
    } catch (error) {
      console.log(error)
      return response.status(401).json({ Error: 'Error trying to verify credentials' })
    }
  }
}
