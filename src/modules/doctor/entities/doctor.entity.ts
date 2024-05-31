import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
