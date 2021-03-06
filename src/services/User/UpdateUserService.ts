import { User } from '../../database/entities/User'
import { UserRepository } from '../../database/repositories/index'

type partialUserRequest = {
  name?: string
  email?: string
}

export class UpdateUserService {
  async execute(userId: string, { name, email }: partialUserRequest): Promise<User | Error> {
    const repo = UserRepository()
    if (!name && !email) return new Error('No data provided')
    try {
      const foundUser = await repo.findOne({ id: userId })
      if (!foundUser) return new Error('User does not exists')
      foundUser.name = name || foundUser.name
      foundUser.email = email || foundUser.email
      repo.save(foundUser)
      delete foundUser.deletedAt
      delete foundUser.createdAt
      delete foundUser.password
      delete foundUser.permissions
      delete foundUser.roles
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Error trying to update user')
    }
  }
}
