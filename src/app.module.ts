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
import { SeederModule } from './database/seeders/seed.module';

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
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
