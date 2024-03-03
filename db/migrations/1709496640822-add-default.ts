import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefault1709496640822 implements MigrationInterface {
    name = 'AddDefault1709496640822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220"`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "isStorno" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_invoices" DROP CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220"`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "isStorno" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project_invoices" ADD CONSTRAINT "FK_712c1d29be77b305d8cf9e5d220" FOREIGN KEY ("invoiceNr") REFERENCES "invoice"("nr") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
