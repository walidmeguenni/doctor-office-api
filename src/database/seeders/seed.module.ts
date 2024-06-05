import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AdministrativeStaffModule } from 'src/modules';

@Module({
  imports: [AdministrativeStaffModule],
  controllers: [],
  providers: [SeederService],
})
export class SeederModule {}
