import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectDataType1709291112402 implements MigrationInterface {
  name = 'CorrectDataType1709291112402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2"`,
    );
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" ADD CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2"`,
    );
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD "amount" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" ADD CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
