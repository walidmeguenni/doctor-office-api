import { Appointment } from './entities/appointment.entity';
import { Module, forwardRef } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
import { DoctorModule } from '../doctor/doctor.module';
import * as dotenv from 'dotenv';
import { PatientModule } from '../patient/patient.module';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([Appointment]),
    AdministrativeStaffModule,
    forwardRef(() => PatientModule),
    forwardRef(() => DoctorModule),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AuthGuard],
  exports: [TypeOrmModule, AppointmentService],
})
export class AppointmentModule {}
