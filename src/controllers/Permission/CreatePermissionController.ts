import { CreatePermissionService } from '../../services/Permission/CreatePermissionService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    const { name, description } = request.body
    const service = new CreatePermissionService()
    const result = await service.execute({ name, description })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
