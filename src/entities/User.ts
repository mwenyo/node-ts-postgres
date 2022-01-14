import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

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
}
