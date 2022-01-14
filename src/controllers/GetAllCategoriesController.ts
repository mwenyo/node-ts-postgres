import { GetAllCategoriesService } from '@services/GetAllCategoriesService'
import { Request, Response } from 'express'

export class GetAllCategoriesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllCategoriesService()
    const result = await service.execute()

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
