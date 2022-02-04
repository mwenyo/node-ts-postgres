import { Role } from '../../database/entities/Role'
import { PermissionRepository, RoleRepository } from '../../database/repositories/index'

type RolePermissionRequest = {
  roleId: string
  permissions: string[]
}

export class CreateRolePermissionService {
  async execute({ roleId, permissions }: RolePermissionRequest): Promise<Role | Error> {
    const repo = RoleRepository()
    try {
      const role = await repo.findOne(roleId)
      if (!role) return new Error('Role does not exists')
      const foundPermissions = await PermissionRepository().findByIds(permissions)
      role.permissions = foundPermissions
      repo.save(role)
      return role
    } catch (error) {
      console.log(error)
      return new Error('Error trying to save')
    }
  }
}
