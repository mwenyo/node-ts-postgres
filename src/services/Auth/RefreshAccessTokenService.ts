import { sign } from 'jsonwebtoken'
import { UserRepository } from '../../repositories/index'

export class RefreshAccessTokenService {
  async execute(userId: string): Promise<string | Error> {
    try {
      const foundUser = await UserRepository().findOne({ id: userId })
      if (!foundUser) return new Error('Invalid refresh token')
      const newAccessToken = sign(
        {},
        process.env.ACCESS_TOKEN_SECRET,
        {
          subject: foundUser.id,
          expiresIn: '3m'
        }
      )
      return newAccessToken
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create access token')
    }
  }
}
