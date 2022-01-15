import { Permition } from 'src/entities/Permition'
import { PermitionRepository } from 'src/repositories'

type PermitionRequest = {
  name: string
  description: string
}

export class CreatePermitionService {
  async execute({ name, description }: PermitionRequest): Promise<Permition | Error> {
    const repo = PermitionRepository()
    try {
      if (await repo.findOne({ name })) return new Error('Permition alredy exists')
      const permition = repo.create({ name, description })
      await repo.save(permition)
      return permition
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create permition')
    }
  }
}
