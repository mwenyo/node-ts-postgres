import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateStartSeed1642996091076 implements MigrationInterface {
  adminUser = {
    id: uuid(),
    name: 'Usuário Supremo',
    email: 'admin@irent-ifpi.com',
    password: hash('12345678', 10)
  }

  adminRole = {
    id: uuid(),
    name: 'admin',
    description: 'All permitions allowed'
  }

  // ==> Permissions of Users
  listUsers = {
    id: uuid(),
    name: 'list_users',
    description: 'Get All Users'
  }

  updateUser = {
    id: uuid(),
    name: 'update_user',
    description: 'Update User'
  }

  deleteUser = {
    id: uuid(),
    name: 'delete_user',
    description: 'Delete User'
  }

  // ==> Permissions of Roles
  createRole = {
    id: uuid(),
    name: 'create_role',
    description: 'Create Role'
  }

  listRoles = {
    id: uuid(),
    name: 'list_roles',
    description: 'Get All Roles'
  }

  updateRole = {
    id: uuid(),
    name: 'update_role',
    description: 'Update Role'
  }

  deleteRole = {
    id: uuid(),
    name: 'delete_role',
    description: 'Delete Role'
  }

  // ==> Permitions of Permissions
  createPermission = {
    id: uuid(),
    name: 'create_permission',
    description: 'Create Permission'
  }

  listPermissions = {
    id: uuid(),
    name: 'list_permissions',
    description: 'Get All Permissions'
  }

  updatePermission = {
    id: uuid(),
    name: 'update_permission',
    description: 'Update Permission'
  }

  deletePermission = {
    id: uuid(),
    name: 'delete_permission',
    description: 'Delete Permission'
  }

  adminRolePermissions = [
    // USERS
    {
      role_id: this.adminRole.id,
      permission_id: this.updateUser.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.deleteUser.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.listUsers.id
    },
    // ROLES
    {
      role_id: this.adminRole.id,
      permission_id: this.createRole.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.updateRole.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.deleteRole.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.listRoles.id
    },
    // PERMISSIONS
    {
      role_id: this.adminRole.id,
      permission_id: this.listPermissions.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.createPermission.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.updatePermission.id
    },
    {
      role_id: this.adminRole.id,
      permission_id: this.deletePermission.id
    }
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(this.adminUser)
      .execute()
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values(this.adminRole)
      .execute()
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('permissions')
      .values([
        this.updateUser, this.updateRole, this.updatePermission,
        this.deleteUser, this.deleteRole, this.deletePermission,
        this.listUsers, this.listRoles, this.listPermissions,
        this.createRole, this.createPermission
      ])
      .execute()
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('permissions_roles')
      .values(this.adminRolePermissions)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('permissions').where('').execute()
  }
}
