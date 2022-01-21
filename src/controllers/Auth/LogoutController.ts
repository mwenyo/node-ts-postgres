import { LogoutService } from '@services/Auth/LogoutService'
import { Request, Response } from 'express'

export class LogoutController {
  async handle(request: Request, response: Response) {
    const { userId } = request
    const service = new LogoutService()
    const result = await service.execute(userId)
    if (result instanceof Error) {
      return response.status(400).json({
        'Error': 'result.message'
      })
    }
    response.clearCookie('token')
    return response.sendStatus(204)
  }
}
