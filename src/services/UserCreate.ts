import { User } from '@models/User'

export class UserCreate {
  teste(): User {
    const user = new User()
    return user
  }
}
