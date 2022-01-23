import { DeletePermissionService } from '../../services/Permission/DeletePermissionService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class DeletePermissionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { permissionId } = request.params
    const service = new DeletePermissionService()
    const result = await service.execute(permissionId)
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
