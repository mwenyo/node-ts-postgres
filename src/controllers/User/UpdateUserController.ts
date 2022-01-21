import { UpdateUserService } from '@services/User/UpdateUserService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { userId } = request.params
    const { name, email } = request.body
    const service = new UpdateUserService()
    const result = await service.execute(userId, { name, email })
    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }
    return response.json(result)
  }
}
