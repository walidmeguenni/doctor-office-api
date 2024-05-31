import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePrescriptionTable1717190721910 implements MigrationInterface {
    name = 'CreatePrescriptionTable1717190721910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "medication" text NOT NULL, "dosage" character varying NOT NULL, "frequency" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "patientId" uuid, "doctorId" uuid, "doctorEmail" character varying, CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_c281aeb62e5b3d79320a114395e" FOREIGN KEY ("doctorId", "doctorEmail") REFERENCES "doctor"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_c281aeb62e5b3d79320a114395e"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279"`);
        await queryRunner.query(`DROP TABLE "prescription"`);
    }

}
