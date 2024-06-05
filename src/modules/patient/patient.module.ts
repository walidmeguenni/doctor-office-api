import { Module, forwardRef } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from '../doctor/doctor.module';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
import { AuthGuard } from '../auth/guard/auth.guard';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AdministrativeStaffModule,
    forwardRef(() => DoctorModule),
    TypeOrmModule.forFeature([Patient]),
  ],
  controllers: [PatientController],
  providers: [PatientService, AuthGuard],
  exports: [TypeOrmModule, PatientService],
})
export class PatientModule {}
