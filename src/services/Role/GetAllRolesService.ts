import { Role } from '@entities/Role'
import { RoleRepository } from '@repositories/index'

export class GetAllRolesService {
  async execute(): Promise<Role[] | Error> {
    const repo = RoleRepository()
    try {
      const roles = await repo.find({ select: ['id', 'name', 'description', 'createdAt', 'updatedAt'], relations: ['permissions'] })
      return roles
    } catch (error) {
      console.log(error)
      return new Error('Error trying to get all roles')
    }
  }
}
