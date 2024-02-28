import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1709137454896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT into "customer" ("id", "name") VALUES (1,'PANDA FACTORY')`,
    );
    await queryRunner.query(
      `INSERT into "customer" ("id", "name") VALUES (2,'BAMBOO FACTORY')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "customer"`);
  }
}
