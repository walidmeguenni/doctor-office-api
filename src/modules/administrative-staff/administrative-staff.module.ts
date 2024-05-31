import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdministrativeStaffService } from './administrative-staff.service';
import { AdministrativeStaffController } from './administrative-staff.controller';
import { AdministrativeStaff } from './entities/administrative-staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministrativeStaff])],
  controllers: [AdministrativeStaffController],
  providers: [AdministrativeStaffService],
})
export class AdministrativeStaffModule {}
