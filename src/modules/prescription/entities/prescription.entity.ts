import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  medication: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.prescriptions)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions)
  doctor: Doctor;
}
