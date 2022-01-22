import { Permition } from 'src/entities/Permition'
import { PermitionRepository } from 'src/repositories'

export class GetAllPermitionsService {
  async execute(): Promise<Permition[] | Error> {
    const repo = PermitionRepository()
    try {
      const permitions = await repo.find({ select: ['id', 'name', 'description', 'createdAt', 'updatedAt'] })
      return permitions
    } catch (error) {
      console.log(error)
      return new Error('Error trying to get all permitions')
    }
  }
}
