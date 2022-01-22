import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Permission } from './Permission'
import { Role } from './Role'

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ name: 'access_token', nullable: true })
  accessToken: string

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string

  @Column({ name: 'email_token', nullable: true })
  emailToken: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' }
  })
  roles: Role[]

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permission_id' }
  })
  permissions: Permission[]
}
