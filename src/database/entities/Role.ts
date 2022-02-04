import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Permission } from './Permission'

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string

  @Column()
  description: string

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'permissions_roles',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' }
  })
  permissions: Permission[]
}
