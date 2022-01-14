import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUserNullableTokens1642161249259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "access_token" DROP NOT NULL')
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "refresh_token" DROP NOT NULL')
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "email_token" DROP NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "access_token" SET NOT NULL')
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "refresh_token" SET NOT NULL')
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "email_token" SET NOT NULL')
  }
}
