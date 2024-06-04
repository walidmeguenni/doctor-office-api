import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { MedicalHistory } from '../../medical-history/entities/medical-history.entity';
import { Prescription } from '../../prescription/entities/prescription.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column()
  address: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'doctor' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
