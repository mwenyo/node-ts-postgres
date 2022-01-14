import { hash } from 'bcryptjs'
import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories'

type UserRequest = {
  name: string,
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password }: UserRequest): Promise<User | Error> {
    try {
      const existUser = await UserRepository().findOne({ email })

      if (existUser) return new Error('User already exists')

      const passwordHash = await hash(password, 10)

      const user = UserRepository().create({
        name,
        email,
        password: passwordHash
      })

      await UserRepository().save(user)

      return user
    } catch {
      return new Error()
    }
  }
}
