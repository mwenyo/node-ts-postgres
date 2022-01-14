import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('permitions')
export class Permition extends BaseEntity {
  @Column()
  name: string

  @Column()
  descripton: string
}
