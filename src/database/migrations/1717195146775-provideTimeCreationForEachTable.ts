import { MigrationInterface, QueryRunner } from "typeorm";

export class ProvideTimeCreationForEachTable1717195146775 implements MigrationInterface {
    name = 'ProvideTimeCreationForEachTable1717195146775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "administrative_staff" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "administrative_staff" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrative_staff" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "administrative_staff" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "medical_history" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "createdAt"`);
    }

}
