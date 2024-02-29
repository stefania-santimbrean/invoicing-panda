import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init21709144001304 implements MigrationInterface {
  name = 'Init21709144001304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD "date" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "date"`);
  }
}
