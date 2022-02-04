import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Category } from './Category'

@Entity('videos')
export class Video {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  duration: number

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
