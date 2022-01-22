import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePermissionsRoles1642133689209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions_roles',
        columns: [
          {
            name: 'permission_id',
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
            isNullable: true
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            columnNames: ['permission_id'],
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            name: 'fk_permissions_role',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            name: 'fk_role_permissions',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions_roles')
  }
}
