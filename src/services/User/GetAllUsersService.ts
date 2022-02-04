import { User } from '../../database/entities/User'
import { UserRepository } from '../../database/repositories/index'

export class GetAllUsersService {
  async execute(): Promise<User[] | Error> {
    const repo = UserRepository()
    try {
      const users = await repo.find({ select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] })
      return users
    } catch (error) {
      console.log(error)
      return new Error('Error trying to get all users')
    }
  }
}
