import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
import * as dotenv from 'dotenv';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientModule } from '../patient/patient.module';
import { AuthGuard } from '../auth/guard/auth.guard';
dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AdministrativeStaffModule,
    DoctorModule,
    PatientModule,
    TypeOrmModule.forFeature([MedicalHistory]),
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, AuthGuard],
})
export class MedicalHistoryModule {}
