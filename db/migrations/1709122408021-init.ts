import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1709122408021 implements MigrationInterface {
  name = 'Init1709122408021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice" ("nr" SERIAL NOT NULL, "isStorno" boolean NOT NULL, "currency" character varying NOT NULL, "amount" character varying NOT NULL, "customerId" integer, CONSTRAINT "PK_0f51ac26eb306cdd5589e833e61" PRIMARY KEY ("nr"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "customerId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_invoices_invoice" ("projectId" integer NOT NULL, "invoiceNr" integer NOT NULL, CONSTRAINT "PK_0e6d673a2811590a0da909885ac" PRIMARY KEY ("projectId", "invoiceNr"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a45e0844cf99928f1f67ffd4a0" ON "project_invoices_invoice" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85eefd56f5bb6e7063bd02170f" ON "project_invoices_invoice" ("invoiceNr") `,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_925aa26ea12c28a6adb614445ee" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" ADD CONSTRAINT "FK_a45e0844cf99928f1f67ffd4a03" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" ADD CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_85eefd56f5bb6e7063bd02170f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_invoices_invoice" DROP CONSTRAINT "FK_a45e0844cf99928f1f67ffd4a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_925aa26ea12c28a6adb614445ee"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_85eefd56f5bb6e7063bd02170f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a45e0844cf99928f1f67ffd4a0"`,
    );
    await queryRunner.query(`DROP TABLE "project_invoices_invoice"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
  }
}
