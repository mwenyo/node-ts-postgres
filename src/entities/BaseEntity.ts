import { PrimaryColumn, CreateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export class BaseEntity {
  @PrimaryColumn()
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
