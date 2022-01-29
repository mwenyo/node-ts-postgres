import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserRepository } from '../../repositories/index'

type UserRequest = {
  email: string
  password: string
}

type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export class LoginService {
  async execute({ email, password }: UserRequest): Promise<TokenResponse | Error> {
    try {
      const foundUser = await UserRepository().findOne({ email })
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
      const result: TokenResponse = {
        accessToken,
        refreshToken
      }
      return result
    } catch (error) {
      console.log(error)
      return new Error('Error trying to login')
    }
  }
}
