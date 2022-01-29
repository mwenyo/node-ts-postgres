import { RefreshAccessTokenService } from '../../services/Auth/RefreshAccessTokenService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { JwtPayload, verify } from 'jsonwebtoken'

export class RefreshAccessTokenController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { cookies } = request
    if (!cookies?.token) return response.status(401).json({ error: 'missing refresh token' })
    const refreshToken = cookies.token.toString()
    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error: Object, decoded: JwtPayload) => {
      if (error) return response.status(400).json({ error })
      const service = new RefreshAccessTokenService()
      const result = await service.execute(decoded.sub)
      if (result instanceof Error) {
        return response.status(400).json({ Error: result.message })
      }
      return response.json({ token: result })
    })
  }
}
