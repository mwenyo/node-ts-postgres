import { User } from '../../entities/User'
import { UserRepository } from '../../repositories/index'

export class LogoutService {
  async execute(userId: string): Promise<User | Error> {
    const repo = UserRepository()
    try {
      const foundUser = await repo.findOne({ id: userId })
      if (!foundUser) return new Error('Unauthorized')
      const refreshToken = ''
      const accessToken = ''
      foundUser.refreshToken = refreshToken
      foundUser.accessToken = accessToken
      await repo.save(foundUser)
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Error Trying to logout')
    }
  }
}
