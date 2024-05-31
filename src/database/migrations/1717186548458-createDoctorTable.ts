import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDoctorTable1717186548458 implements MigrationInterface {
    name = 'CreateDoctorTable1717186548458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying NOT NULL, "specialization" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_fdaca66fff7caa0e67a0326a141" PRIMARY KEY ("id", "email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "doctor"`);
    }

}
