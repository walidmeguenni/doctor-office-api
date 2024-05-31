import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
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
    TypeOrmModule.forRoot(DatabaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
