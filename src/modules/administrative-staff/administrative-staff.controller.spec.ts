import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeStaffController } from './administrative-staff.controller';
import { AdministrativeStaffService } from './administrative-staff.service';

describe('AdministrativeStaffController', () => {
  let controller: AdministrativeStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeStaffController],
      providers: [AdministrativeStaffService],
    }).compile();

    controller = module.get<AdministrativeStaffController>(AdministrativeStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
