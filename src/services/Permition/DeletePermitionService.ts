import { Permition } from 'src/entities/Permition'
import { PermitionRepository } from 'src/repositories'

export class DeletePermitionService {
  async execute(permitionId: string): Promise<Permition | Error> {
    const repo = PermitionRepository()
    try {
      const foundPermition = await repo.findOne(permitionId)
      await repo.softRemove(foundPermition)
      delete foundPermition.deletedAt
      delete foundPermition.createdAt
      return foundPermition
    } catch (error) {
      console.log(error)
      return new Error('Error trying to delete permition')
    }
  }
}
