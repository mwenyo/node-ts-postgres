import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from 'src/database/entities/User'
import { UserRepository } from '../../database/repositories/index'

type UserRequest = {
  email: string
  password: string
}

type TokenResponse = {
  accessToken: string
  refreshToken: string,
  user: User
}

export class LoginService {
  async execute({ email, password }: UserRequest): Promise<TokenResponse | Error> {
    try {
      const foundUser = await UserRepository()
        .findOne(
          { email },
          { select: ['email', 'name', 'password'] }
        )
      if (!foundUser) return new Error('Unauthorized')
      const passwordMatch = await compare(password, foundUser.password)
      if (!passwordMatch) return new Error('Unauthorized')
      const refreshToken = sign(
        {},
        process.env.REFRESH_TOKEN_SECRET,
        {
          subject: foundUser.id,
          expiresIn: '1d'
        }
      )
      const accessToken = sign(
        {},
        process.env.ACCESS_TOKEN_SECRET,
        {
          subject: foundUser.id,
          expiresIn: '3m'
        }
      )
      delete foundUser.password
      delete foundUser.id
      const result: TokenResponse = {
        accessToken,
        refreshToken,
        user: foundUser
      }
      return result
    } catch (error) {
      console.log(error)
      return new Error('Error trying to login')
    }
  }
}
