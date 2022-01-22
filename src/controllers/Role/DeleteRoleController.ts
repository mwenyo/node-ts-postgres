import { DeleteRoleService } from '@services/Role/DeleteRoleService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class DeleteRoleController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { roleId } = request.params
    const service = new DeleteRoleService()
    const result = await service.execute(roleId)
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
