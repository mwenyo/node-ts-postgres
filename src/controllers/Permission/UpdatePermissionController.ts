import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { UpdatePermissionService } from '@services/Permission/UpdatePermissionService'

export class UpdatePermissionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { permissionId } = request.params
    const { name, description } = request.body
    const service = new UpdatePermissionService()
    const result = await service.execute(permissionId, { name, description })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
