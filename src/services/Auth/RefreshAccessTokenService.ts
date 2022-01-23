import { sign } from 'jsonwebtoken'
import { User } from '@entities/User'
import { UserRepository } from '@repositories'

export class RefreshAccessTokenService {
  async execute(refreshToken: string): Promise<User | Error> {
    try {
      const foundUser = await UserRepository().findOne({ refreshToken })
      if (!foundUser) return new Error('Invalid refresh token')
      const newAccessToken = sign(
        {},
        process.env.ACCESS_TOKEN_SECRET,
        {
          subject: foundUser.id,
          expiresIn: '3m'
        }
      )
      foundUser.accessToken = newAccessToken
      await UserRepository().save(foundUser)
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create access token')
    }
  }
}
