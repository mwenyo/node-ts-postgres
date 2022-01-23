import { Request, Response } from 'express'
import { GetAllRolesService } from '../../services/Role/GetAllRolesService'

export class GetAllRolesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllRolesService()
    const result = await service.execute()
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
