import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeStaffService } from './administrative-staff.service';

describe('AdministrativeStaffService', () => {
  let service: AdministrativeStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrativeStaffService],
    }).compile();

    service = module.get<AdministrativeStaffService>(AdministrativeStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
