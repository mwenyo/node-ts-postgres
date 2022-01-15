import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories'

export class GetAllUsersService {
  async execute(): Promise<User[] | Error> {
    try {
      const users = UserRepository().find()
      return users
    } catch (error) {
      return new Error('Error trying to get all users')
    }
  }
}
