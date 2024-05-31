import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientTable1717189478510 implements MigrationInterface {
    name = 'CreatePatientTable1717189478510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "address" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
