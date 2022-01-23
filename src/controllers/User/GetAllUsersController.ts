import { GetAllUsersService } from '../../services/User/GetAllUsersService'
import { Request, Response } from 'express'

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    const service = new GetAllUsersService()
    const result = await service.execute()
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
