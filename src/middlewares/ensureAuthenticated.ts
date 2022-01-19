import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from 'src/repositories'

export const ensureAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization
      const [, token] = authHeader.split(' ')
      const foundUser = await UserRepository().findOne({ accessToken: token })
      if (!foundUser) return response.status(401).json({ Error: 'Usuário não existe' })
      verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.id.toString() !== decoded.sub) return response.status(401).json({ err })
        request.userId = decoded.sub.toString()
        return next()
      })
    } catch (error) {
      console.log(error)
      return response.status(401).json({ Error: 'Não foi possível autenticar usuário' })
    }
  }
}
