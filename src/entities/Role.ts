import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Permition } from './Permition'

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  name: string

  @Column()
  descripton: string

  @ManyToMany(() => Permition)
  @JoinTable({
    name: 'permitions_roles',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permition_id' }
  })
  permitions: Permition[]
}
