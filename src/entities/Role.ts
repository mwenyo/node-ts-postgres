import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  name: string

  @Column()
  descripton: string
}
