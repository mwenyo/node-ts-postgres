import { CookieOptions, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginService } from '../../services/Auth/LoginService'

export class LoginController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    const service = new LoginService()
    const { email, password } = request.body
    console.log(email, password)
    const result = await service.execute({ email, password })
    if (result instanceof Error) {
      console.log(result)
      return response.status(401).json(result.message)
    }
    let cookieOptions: CookieOptions = {
      httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
      cookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      }
    } else {
      cookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: false
      }
    }
    response.cookie(
      'token',
      result.refreshToken,
      cookieOptions
    )
    return response.status(200).json({ token: result.accessToken, user: result.user })
  }
}
