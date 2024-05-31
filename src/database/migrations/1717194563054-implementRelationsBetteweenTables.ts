import { MigrationInterface, QueryRunner } from "typeorm";

export class ImplementRelationsBetteweenTables1717194563054 implements MigrationInterface {
    name = 'ImplementRelationsBetteweenTables1717194563054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medical_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "diagnosis" character varying NOT NULL, "treatment" character varying NOT NULL, "notes" text NOT NULL, "patientId" uuid, "doctorId" uuid, "doctorEmail" character varying, CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "PK_5017652a90b7e4a24869c76fc35"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "reason" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "doctorEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_fb7af7f534c0c16f4b34ac3b358" FOREIGN KEY ("doctorId", "doctorEmail") REFERENCES "doctor"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_812de45a50f522f77ee0a17652f" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_e3ef4dcaa7099dad791459ae8e4" FOREIGN KEY ("doctorId", "doctorEmail") REFERENCES "doctor"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_e3ef4dcaa7099dad791459ae8e4"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_812de45a50f522f77ee0a17652f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_fb7af7f534c0c16f4b34ac3b358"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "doctorEmail"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "PK_e8be1a53027415e709ce8a2db74"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "PK_5017652a90b7e4a24869c76fc35" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "lastName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "firstName" character varying(50) NOT NULL`);
        await queryRunner.query(`DROP TABLE "medical_history"`);
    }

}
