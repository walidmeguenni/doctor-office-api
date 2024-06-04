import { IsEmail } from 'class-validator';
import { MedicalHistory } from '../../medical-history/entities/medical-history.entity';
import { Prescription } from '../../prescription/entities/prescription.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @PrimaryColumn()
  @IsEmail()
  email: string;

  @Column()
  specialization: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'doctor' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.doctor)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
