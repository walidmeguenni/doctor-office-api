import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdministrativeStaffService } from './administrative-staff.service';
import { AdministrativeStaff } from './entities/administrative-staff.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([AdministrativeStaff]),
  ],
  controllers: [],
  providers: [AdministrativeStaffService],
  exports: [TypeOrmModule, AdministrativeStaffService],
})
export class AdministrativeStaffModule {}
