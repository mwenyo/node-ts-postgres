import { Role } from '@entities/Role'
import { RoleRepository } from '@repositories/index'

export class DeleteRoleService {
  async execute(roleId: string): Promise<Role | Error> {
    const repo = RoleRepository()
    try {
      const foundRole = await repo.findOne(roleId)
      await repo.softRemove(foundRole)
      delete foundRole.deletedAt
      delete foundRole.createdAt
      delete foundRole.permissions
      return foundRole
    } catch (error) {
      console.log(error)
      return new Error('Error trying to delete role')
    }
  }
}
