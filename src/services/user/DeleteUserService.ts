import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories'

export class DeleteUserService {
  async execute(id: string): Promise<User | Error> {
    const repo = UserRepository()
    try {
      await repo.softDelete(id)
    } catch (error) {
      return new Error('Error trying to delete user')
    }
  }
}
