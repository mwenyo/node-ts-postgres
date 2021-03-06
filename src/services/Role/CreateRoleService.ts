import { Role } from '../../database/entities/Role'
import { RoleRepository } from '../../database/repositories/index'

type RoleRequest = {
  name: string
  description: string
}

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repo = RoleRepository()
    try {
      if (await repo.findOne({ name })) return new Error('Role alredy exists')
      const role = repo.create({ name, description })
      await repo.save(role)
      return role
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create role')
    }
  }
}
