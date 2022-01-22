import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { UpdatePermitionService } from '@services/Permition/UpdatePermitionService'

export class UpdatePermitionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { permitionId } = request.params
    const { name, description } = request.body
    const service = new UpdatePermitionService()
    const result = await service.execute(permitionId, { name, description })
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
