import { MigrationInterface, QueryRunner } from "typeorm";

export class Addrole1717521389529 implements MigrationInterface {
    name = 'Addrole1717521389529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" character varying NOT NULL DEFAULT 'doctor'`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "role" character varying NOT NULL DEFAULT 'doctor'`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "administrative_staff" ADD "role" character varying NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrative_staff" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
    }

}
