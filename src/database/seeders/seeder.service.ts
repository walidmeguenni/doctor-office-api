import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AdministrativeStaffService } from '../../modules/administrative-staff/administrative-staff.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly administrativeStaffService: AdministrativeStaffService,
  ) {}

  async seed() {
    await this.administrativeStaffService.create();
  }

  async onApplicationBootstrap() {
    await this.seed();
  }
}
