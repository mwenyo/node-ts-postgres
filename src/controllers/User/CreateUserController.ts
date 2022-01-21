import { CreateUserService } from '@services/User/CreateUserService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    const service = new CreateUserService()
    const { name, email, password } = request.body
    const result = await service.execute({ name, email, password })
    if (result instanceof Error) {
      return response.status(400).json({
        'Error': 'result.message'
      })
    }
    return response.json(result)
  }
}
