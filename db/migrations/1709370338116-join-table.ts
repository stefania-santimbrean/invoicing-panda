import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinTable1709370338116 implements MigrationInterface {
  name = 'JoinTable1709370338116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_invoices" ("projectId" integer NOT NULL, "invoiceNr" integer NOT NULL, CONSTRAINT "PK_7030f9424f75c6999b89c0da58d" PRIMARY KEY ("projectId", "invoiceNr"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43edbfbb56a52a23e7a2e282ba" ON "project_invoices" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_712c1d29be77b305d8cf9e5d22" ON "project_invoices" ("invoiceNr") `,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_43edbfbb56a52a23e7a2e282ba2" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_a45e0844cf99928f1f67ffd4a03"`,
    );
    await queryRunner.query(`DROP TABLE "project_invoices_invoice"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_43edbfbb56a52a23e7a2e282ba2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_712c1d29be77b305d8cf9e5d22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_43edbfbb56a52a23e7a2e282ba"`,
    );
    await queryRunner.query(`DROP TABLE "project_invoices"`);
  }
}
