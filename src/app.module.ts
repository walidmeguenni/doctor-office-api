import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/database.config';
import {
  DoctorModule,
  AdministrativeStaffModule,
  AppointmentModule,
  PatientModule,
  MedicalHistoryModule,
  PrescriptionModule,
  AuthModule,
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    DoctorModule,
    AdministrativeStaffModule,
    AppointmentModule,
    PatientModule,
    MedicalHistoryModule,
    PrescriptionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
