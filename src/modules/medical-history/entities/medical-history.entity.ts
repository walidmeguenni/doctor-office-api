import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  diagnosis: string;

  @Column()
  treatment: string;

  @Column('text')
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistories)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistories)
  doctor: Doctor;
}
