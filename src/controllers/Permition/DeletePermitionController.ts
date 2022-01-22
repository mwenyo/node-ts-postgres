import { DeletePermitionService } from '@services/Permition/DeletePermitionService'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class DeletePermitionController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() })
    const { permitionId } = request.params
    const service = new DeletePermitionService()
    const result = await service.execute(permitionId)
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
