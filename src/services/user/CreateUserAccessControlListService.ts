import { User } from '../../entities/User'
import { PermissionRepository, RoleRepository, UserRepository } from '../../repositories/index'

type UserACLRequest = {
  userId: string
  permissions: string[]
  roles: string[]
}

export class CreateUserAccessControlListService {
  async execute({ userId, roles, permissions }: UserACLRequest): Promise<User | Error> {
    const repo = UserRepository()
    try {
      const user = await repo.findOne(userId, { select: ['id'] })
      if (!user) return new Error('User does not extists')
      const foundRoles = await RoleRepository().findByIds(roles)
      const foundPermissions = await PermissionRepository().findByIds(permissions)

      user.roles = foundRoles
      user.permissions = foundPermissions

      repo.save(user)

      return user
    } catch (error) {
      console.log(error)
      return new Error('Error Trying to create users ACL')
    }
  }
}
