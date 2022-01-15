import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories'

type UserRequest = {
  email: string
  password: string
}

export class LoginService {
  async execute({ email, password }: UserRequest): Promise<User | Error> {
    try {
      const foundUser = await UserRepository().findOne({ email })
      if (!foundUser) return new Error('Unauthorized')
      const passwordMatch = compare(password, foundUser.password)
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
      foundUser.refreshToken = refreshToken
      foundUser.accessToken = accessToken
      await UserRepository().save(foundUser)
      return foundUser
    } catch (error) {
      console.log(error)
      return new Error('Erro ao realizar login')
    }
  }
}
