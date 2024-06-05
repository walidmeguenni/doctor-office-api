/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAdministrativeStaffDto } from './dto/create-administrative-staff.dto';
import { UpdateAdministrativeStaffDto } from './dto/update-administrative-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministrativeStaff } from './entities/administrative-staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministrativeStaffService {
  constructor(
    @InjectRepository(AdministrativeStaff)
    private readonly adminRepository: Repository<AdministrativeStaff>,
  ) {}
  async isAutorized(id: string): Promise<boolean> {
    const admin = await this.adminRepository.findOneBy({id});
    return admin? true: false
  }
}
