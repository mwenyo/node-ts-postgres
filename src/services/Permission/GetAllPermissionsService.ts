import { Permission } from '@entities/Permission'
import { PermissionRepository } from '@repositories'

export class GetAllPermissionsService {
  async execute(): Promise<Permission[] | Error> {
    const repo = PermissionRepository()
    try {
      const permissions = await repo.find({ select: ['id', 'name', 'description', 'createdAt', 'updatedAt'] })
      return permissions
    } catch (error) {
      console.log(error)
      return new Error('Error trying to get all permissions')
    }
  }
}
