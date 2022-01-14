import { CreateUserService } from '@services/User/CreateUserService'
import { Request, Response } from 'express'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const service = new CreateUserService()
    const { name, email, password } = request.body
    const result = await service.execute({ name, email, password })
    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }
    return response.json(result)
  }
}
