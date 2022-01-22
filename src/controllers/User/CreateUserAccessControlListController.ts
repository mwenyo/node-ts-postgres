import { CreateUserAccessControlListService } from '@services/User/CreateUserAccessControlListService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    const { roles, permissions } = request.body
    const { userId } = request
    const service = new CreateUserAccessControlListService()
    const result = await service.execute({ userId, roles, permissions })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
