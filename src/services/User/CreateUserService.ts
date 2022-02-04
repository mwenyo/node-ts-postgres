import { hash } from 'bcryptjs'
import { User } from '../../database/entities/User'
import { UserRepository } from '../../database/repositories/index'

type UserRequest = {
  name: string,
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password }: UserRequest): Promise<User | Error> {
    try {
      const existUser = await UserRepository().findOne({ email })
      if (existUser) return new Error('Email already in use')
      const passwordHash = await hash(password, 10)
      const user = UserRepository().create({
        name,
        email,
        password: passwordHash
      })
      await UserRepository().save(user)
      return user
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create user')
    }
  }
}
