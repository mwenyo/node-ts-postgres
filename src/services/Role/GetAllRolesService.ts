import { Role } from 'src/entities/Role'
import { RoleRepository } from 'src/repositories'

export class GetAllRolesService {
  async execute(): Promise<Role[] | Error> {
    const repo = RoleRepository()
    try {
      const roles = await repo.find({ select: ['id', 'name', 'description', 'createdAt', 'updatedAt'], relations: ['permitions'] })
      return roles
    } catch (error) {
      console.log(error)
      return new Error('Error trying to get all roles')
    }
  }
}
