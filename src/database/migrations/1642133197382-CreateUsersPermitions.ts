import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersPermitions1642133197382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_permitions',
        columns: [
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'permition_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            name: 'fk_user_permitions',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['permition_id'],
            referencedTableName: 'permitions',
            referencedColumnNames: ['id'],
            name: 'fk_permitions_user',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_permitions')
  }
}
