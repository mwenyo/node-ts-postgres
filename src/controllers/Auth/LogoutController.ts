import { Request, Response } from 'express'

export class LogoutController {
  async handle(request: Request, response: Response) {
    response.clearCookie('token')
    return response.sendStatus(204)
  }
}
