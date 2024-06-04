import { Appointment } from './entities/appointment.entity';
import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';
import { DoctorModule } from '../doctor/doctor.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15h' },
    }),
    TypeOrmModule.forFeature([Appointment]),
    AdministrativeStaffModule,
    DoctorModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AuthGuard],
})
export class AppointmentModule {}
