import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePatient1717529450965 implements MigrationInterface {
    name = 'UpdatePatient1717529450965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_812de45a50f522f77ee0a17652f"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "patientEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "PK_32f09dea5d38af22bd02c2be508" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD "patientEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD "patientEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "role" SET DEFAULT 'patient'`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_eb24bf446fff3e425c4615f052e" FOREIGN KEY ("patientId", "patientEmail") REFERENCES "patient"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_a109191b07db3d2b6d7f9b797bc" FOREIGN KEY ("patientId", "patientEmail") REFERENCES "patient"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_2b03e10cd10dfa69f6c3088f0c7" FOREIGN KEY ("patientId", "patientEmail") REFERENCES "patient"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_2b03e10cd10dfa69f6c3088f0c7"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_a109191b07db3d2b6d7f9b797bc"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_eb24bf446fff3e425c4615f052e"`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "role" SET DEFAULT 'doctor'`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "patientEmail"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP COLUMN "patientEmail"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "PK_32f09dea5d38af22bd02c2be508"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "patientEmail"`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_812de45a50f522f77ee0a17652f" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
