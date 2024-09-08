import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1725828788714 implements MigrationInterface {
  name = 'CreateEntities1725828788714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_entity" ("category_id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_086acbcc32058cf99d66f7414bb" PRIMARY KEY ("category_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_entity" ("transaction_id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "category_id" integer, CONSTRAINT "PK_eb7f7c48eb966958e2ab7eb3b70" PRIMARY KEY ("transaction_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_02777d5180610e45ddbb9bd5429" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_entity" ADD CONSTRAINT "FK_2a27182dab51db48ade71d12f05" FOREIGN KEY ("user_id") REFERENCES "user_entity"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_entity" ADD CONSTRAINT "FK_87399d53a927c7f1017415de3f3" FOREIGN KEY ("user_id") REFERENCES "user_entity"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_entity" ADD CONSTRAINT "FK_9d47d5c237f98c2d8d247c2d081" FOREIGN KEY ("category_id") REFERENCES "category_entity"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_entity" DROP CONSTRAINT "FK_9d47d5c237f98c2d8d247c2d081"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_entity" DROP CONSTRAINT "FK_87399d53a927c7f1017415de3f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_entity" DROP CONSTRAINT "FK_2a27182dab51db48ade71d12f05"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "transaction_entity"`);
    await queryRunner.query(`DROP TABLE "category_entity"`);
  }
}
