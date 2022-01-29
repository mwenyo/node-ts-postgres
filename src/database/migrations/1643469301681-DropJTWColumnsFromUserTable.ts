import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropJTWColumnsFromUserTable1643469301681 implements MigrationInterface {
  name = 'DropJTWColumnsFromUserTable1643469301681'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "access_token"')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "refresh_token"')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "email_token"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ADD COLUMN "access_token" varchar')
    await queryRunner.query('ALTER TABLE "users" ADD COLUMN "refresh_token" varchar')
    await queryRunner.query('ALTER TABLE "users" ADD COLUMN "email_token" varchar')
  }
}
