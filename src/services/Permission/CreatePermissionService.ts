import { Permission } from '../../database/entities/Permission'
import { PermissionRepository } from '../../database/repositories/index'

type PermissionRequest = {
  name: string
  description: string
}

export class CreatePermissionService {
  async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {
    const repo = PermissionRepository()
    try {
      if (await repo.findOne({ name })) return new Error('Permission alredy exists')
      const permission = repo.create({ name, description })
      await repo.save(permission)
      return permission
    } catch (error) {
      console.log(error)
      return new Error('Error trying to create permission')
    }
  }
}
