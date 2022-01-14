import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePermitionsRoles1642133689209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permitions_roles',
        columns: [
          {
            name: 'permition_id',
            type: 'uuid'
          },
          {
            name: 'role_id',
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
            columnNames: ['permition_id'],
            referencedTableName: 'permitions',
            referencedColumnNames: ['id'],
            name: 'fk_permitions_role',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            name: 'fk_role_permitions',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permitions_roles')
  }
}
