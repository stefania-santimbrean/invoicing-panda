import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1709137454896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT into "customer" ("id", "name") VALUES (1,'PANDA FACTORY')`,
    );
    await queryRunner.query(
      `INSERT into "customer" ("id", "name") VALUES (2,'BAMBOO FACTORY')`,
    );

    await queryRunner.query(
      `INSERT into "project" ("id", "name", "customerId") VALUES (1,'SWIM COMPETITION',2)`,
    );

    await queryRunner.query(
      `INSERT into "project" ("id", "name", "customerId") VALUES (2,'CLIMBING COMPETITION',2)`,
    );

    await queryRunner.query(
      `INSERT into "invoice" ("nr", "isStorno", "currency", "amount", "customerId", "date") VALUES (1,false,'RON',100,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "invoice"`);
    await queryRunner.query(`DELETE FROM "project"`);
    await queryRunner.query(`DELETE FROM "customer"`);
  }
}
