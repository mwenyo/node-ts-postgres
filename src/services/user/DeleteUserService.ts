import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories'

export class DeleteUserService {
  async execute(userId: string): Promise<User | Error> {
    const repo = UserRepository()
    try {
      const foundUser = await repo.findOne(userId)
      await repo.softRemove(foundUser)
      delete foundUser.deletedAt
      delete foundUser.createdAt
      delete foundUser.permitions
      delete foundUser.roles
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Error trying to delete user')
    }
  }
}
