import { Permission } from '../entities/Permission'
import { Role } from '../entities/Role'
import { User } from '../entities/User'
import { getRepository } from 'typeorm'

export const UserRepository = () => {
  return getRepository(User)
}
export const RoleRepository = () => {
  return getRepository(Role)
}
export const PermissionRepository = () => {
  return getRepository(Permission)
}
