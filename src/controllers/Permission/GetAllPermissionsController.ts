import { Request, Response } from 'express'
import { GetAllPermissionsService } from '@services/Permission/GetAllPermissionsService'

export class GetAllPermissionsController {
  async handle(request: Request, response: Response) {
    const service = new GetAllPermissionsService()
    const result = await service.execute()
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
