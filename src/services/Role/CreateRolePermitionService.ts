import { Role } from 'src/entities/Role'
import { PermitionRepository, RoleRepository } from 'src/repositories'

type RolePermitionRequest = {
  roleId: string
  permitions: string[]
}

export class CreateRolePermitionService {
  async execute({ roleId, permitions }: RolePermitionRequest): Promise<Role | Error> {
    const repo = RoleRepository()
    try {
      const role = await repo.findOne(roleId)
      if (!role) return new Error('Role does not exists')
      const foundPermitions = await PermitionRepository().findByIds(permitions)
      role.permitions = foundPermitions
      repo.save(role)
      return role
    } catch (error) {
      console.log(error)
      return new Error('Error trying to save')
    }
  }
}
