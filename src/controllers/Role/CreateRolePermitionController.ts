import { CreateRolePermissionService } from '@services/Role/CreateRolePermissionService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { roleId } = request.params
    const { permissions } = request.body
    const service = new CreateRolePermissionService()
    const result = await service.execute({ roleId, permissions })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
