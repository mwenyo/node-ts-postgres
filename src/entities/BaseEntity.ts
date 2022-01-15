import { PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export class BaseEntity {
  @PrimaryColumn()
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
