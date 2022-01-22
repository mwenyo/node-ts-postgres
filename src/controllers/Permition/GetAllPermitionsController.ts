import { Request, Response } from 'express'
import { GetAllPermitionsService } from '@services/Permition/GetAllPermitionsService'

export class GetAllPermitionsController {
  async handle(request: Request, response: Response) {
    const service = new GetAllPermitionsService()
    const result = await service.execute()
    if (result instanceof Error) {
      return response.status(400).json({ Error: result.message })
    }
    return response.json(result)
  }
}
