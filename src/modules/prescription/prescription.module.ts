import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientModule } from '../patient/patient.module';
import { AuthGuard } from '../auth/guard/auth.guard';
import * as dotenv from 'dotenv';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15h' },
    }),
    AdministrativeStaffModule,
    DoctorModule,
    PatientModule,
    TypeOrmModule.forFeature([Prescription]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, AuthGuard],
})
export class PrescriptionModule {}
