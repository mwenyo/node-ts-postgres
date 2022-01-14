import { Permition } from 'src/entities/Permition'
import { Role } from 'src/entities/Role'
import { User } from 'src/entities/User'
import { getRepository } from 'typeorm'

export const UserRepository = () => {
  return getRepository(User)
}
export const RoleRepository = () => {
  return getRepository(Role)
}
export const PermitionRepository = () => {
  return getRepository(Permition)
}
