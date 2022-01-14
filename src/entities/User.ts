import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Permition } from './Permition'
import { Role } from './Role'

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'access_token' })
  accessToken: string

  @Column({ name: 'refresh_token' })
  refreshToken: string

  @Column({ name: 'email_token' })
  emailToken: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' }
  })
  roles: Role[]

  @ManyToMany(() => Permition)
  @JoinTable({
    name: 'users_permitions',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permition_id' }
  })
  permitions: Permition[]
}
