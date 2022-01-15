import { CreateRolePermitionService } from '@services/Role/CreateRolePermitionService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class CreateRolePermitionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { role, permitions } = request.body
    const service = new CreateRolePermitionService()
    const result = await service.execute({ roleId: role, permitions })
    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }
    return response.json(result)
  }
}
