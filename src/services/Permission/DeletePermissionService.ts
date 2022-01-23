import { Permission } from '@entities/Permission'
import { PermissionRepository } from '@repositories'

export class DeletePermissionService {
  async execute(permissionId: string): Promise<Permission | Error> {
    const repo = PermissionRepository()
    try {
      const foundPermission = await repo.findOne(permissionId)
      await repo.softRemove(foundPermission)
      delete foundPermission.deletedAt
      delete foundPermission.createdAt
      return foundPermission
    } catch (error) {
      console.log(error)
      return new Error('Error trying to delete permission')
    }
  }
}
