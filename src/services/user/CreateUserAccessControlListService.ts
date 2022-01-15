import { User } from 'src/entities/User'
import { PermitionRepository, RoleRepository, UserRepository } from 'src/repositories'

type UserACLRequest = {
  userId: string
  permitions: string[]
  roles: string[]
}

export class CreateUserAccessControlListService {
  async execute({ userId, roles, permitions }: UserACLRequest): Promise<User | Error> {
    const repo = UserRepository()
    try {
      const user = await repo.findOne(userId, { select: ['id'] })
      if (!user) return new Error('User does not extists')
      const foundRoles = await RoleRepository().findByIds(roles)
      const foundPermitions = await PermitionRepository().findByIds(permitions)

      user.roles = foundRoles
      user.permitions = foundPermitions

      repo.save(user)

      return user
    } catch (error) {
      console.log(error)
      return new Error('Error Trying to create users ACL')
    }
  }
}