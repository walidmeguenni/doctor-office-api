import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AdministrativeStaffModule } from '../administrative-staff/administrative-staff.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15h' },
    }),
    TypeOrmModule.forFeature([Doctor]),
    AdministrativeStaffModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService, AuthGuard],
  exports: [TypeOrmModule],
})
export class DoctorModule {}
