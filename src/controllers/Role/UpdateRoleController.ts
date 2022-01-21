import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { UpdateRoleService } from '@services/Role/UpdateRoleService'

export class UpdateRoleController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { roleId } = request.params
    const { name, description } = request.body
    const service = new UpdateRoleService()
    const result = await service.execute(roleId, { name, description })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
