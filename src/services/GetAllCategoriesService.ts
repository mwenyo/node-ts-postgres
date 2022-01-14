import { Category } from 'src/entities/Category'
import { getRepository } from 'typeorm'

export class GetAllCategoriesService {
  async execute(): Promise<Category[] | Error> {
    const repo = getRepository(Category)
    try {
      const category = await repo.find()
      return category
    } catch (error) {
      return new Error('Cannot find categories')
    }
  }
}
