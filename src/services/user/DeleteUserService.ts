import { User } from '@entities/User'
import { UserRepository } from '@repositories'

export class DeleteUserService {
  async execute(userId: string): Promise<User | Error> {
    const repo = UserRepository()
    try {
      const foundUser = await repo.findOne(userId)
      await repo.softRemove(foundUser)
      delete foundUser.deletedAt
      delete foundUser.createdAt
      delete foundUser.permissions
      delete foundUser.roles
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Error trying to delete user')
    }
  }
}
