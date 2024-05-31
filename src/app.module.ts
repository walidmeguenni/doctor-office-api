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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
