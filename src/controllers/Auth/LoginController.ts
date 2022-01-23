import { LoginService } from '@services/Auth/LoginService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class LoginController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    const service = new LoginService()
    const { email, password } = request.body
    const result = await service.execute({ email, password })
    if (result instanceof Error) {
      return response.status(401).json(result.message)
    }
    response.cookie(
      'token',
      result.refreshToken,
      {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true
      }
    )
    return response.status(200).json({ token: result.accessToken })
  }
}
