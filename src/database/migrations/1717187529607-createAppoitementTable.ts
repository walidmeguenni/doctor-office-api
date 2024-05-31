import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppoitementTable1717187529607 implements MigrationInterface {
    name = 'CreateAppoitementTable1717187529607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_5017652a90b7e4a24869c76fc35" PRIMARY KEY ("id", "email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
