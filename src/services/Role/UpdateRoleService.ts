import { Role } from '../../database/entities/Role'
import { RoleRepository } from '../../database/repositories/index'

type partialRoleRequest = {
  name?: string
  description?: string
}

export class UpdateRoleService {
  async execute(roleId: string, { name, description }: partialRoleRequest): Promise<Role | Error> {
    const repo = RoleRepository()
    try {
      const foundRole = await repo.findOne({ id: roleId })
      foundRole.name = name || foundRole.name
      foundRole.description = description || foundRole.description
      await repo.save(foundRole)
      return foundRole
    } catch (error) {
      console.log(error)
      return new Error('Error trying to update role')
    }
  }
}
