import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorModule } from '../doctor/doctor.module';
import { JwtModule } from '@nestjs/jwt';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
import { PatientModule } from '../patient/patient.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15h' },
    }),
    DoctorModule,
    AdministrativeStaffModule,
    PatientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
