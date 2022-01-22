import { Permition } from 'src/entities/Permition'
import { PermitionRepository } from 'src/repositories'

type partialPermitionRequest = {
  name?: string
  description?: string
}

export class UpdatePermitionService {
  async execute(permitionId: string, { name, description }: partialPermitionRequest): Promise<Permition | Error> {
    const repo = PermitionRepository()
    try {
      const foundPermition = await repo.findOne({ id: permitionId })
      foundPermition.name = name || foundPermition.name
      foundPermition.description = description || foundPermition.description
      await repo.save(foundPermition)
      return foundPermition
    } catch (error) {
      console.log(error)
      return new Error('Error trying to update permition')
    }
  }
}
