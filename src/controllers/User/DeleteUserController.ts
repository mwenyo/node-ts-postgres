import { DeleteUserService } from '@services/User/DeleteUserService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { userI } = request.params
    const service = new DeleteUserService()
    const result = await service.execute(userI)
    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }
    return response.json(result)
  }
}
