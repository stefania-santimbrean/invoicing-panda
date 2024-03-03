import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvoiceChanges1709476347117 implements MigrationInterface {
  name = 'InvoiceChanges1709476347117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD "stornoRef" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD "paid" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_925aa26ea12c28a6adb614445ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ALTER COLUMN "customerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_925aa26ea12c28a6adb614445ee" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_925aa26ea12c28a6adb614445ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ALTER COLUMN "customerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_925aa26ea12c28a6adb614445ee" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "paid"`);
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "stornoRef"`);
  }
}
