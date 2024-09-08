import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddGenderColumn1725829729838 implements MigrationInterface {
  name = 'UserAddGenderColumn1725829729838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_gender_enum" AS ENUM('1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "gender" "public"."user_entity_gender_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_gender_enum"`);
  }
}
