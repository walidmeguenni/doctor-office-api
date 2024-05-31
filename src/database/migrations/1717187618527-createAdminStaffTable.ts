import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminStaffTable1717187618527 implements MigrationInterface {
    name = 'CreateAdminStaffTable1717187618527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "administrative_staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_680fa81fc90ec862fd109ab834f" PRIMARY KEY ("id", "email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "administrative_staff"`);
    }

}
