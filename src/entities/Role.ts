import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Permition } from './Permition'

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string

  @Column()
  description: string

  @ManyToMany(() => Permition, { eager: true })
  @JoinTable({
    name: 'permitions_roles',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permition_id' }
  })
  permitions: Permition[]
}
