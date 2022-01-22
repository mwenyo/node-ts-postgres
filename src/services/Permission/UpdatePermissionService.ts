import { Permission } from 'src/entities/Permission'
import { PermissionRepository } from 'src/repositories'

type partialPermissionRequest = {
  name?: string
  description?: string
}

export class UpdatePermissionService {
  async execute(permissionId: string, { name, description }: partialPermissionRequest): Promise<Permission | Error> {
    const repo = PermissionRepository()
    try {
      const foundPermission = await repo.findOne({ id: permissionId })
      foundPermission.name = name || foundPermission.name
      foundPermission.description = description || foundPermission.description
      await repo.save(foundPermission)
      return foundPermission
    } catch (error) {
      console.log(error)
      return new Error('Error trying to update permission')
    }
  }
}
