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

  create(createAdministrativeStaffDto: CreateAdministrativeStaffDto) {
    return 'This action adds a new administrativeStaff';
  }

  findAll() {
    return `This action returns all administrativeStaff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativeStaff`;
  }

  update(id: number, updateAdministrativeStaffDto: UpdateAdministrativeStaffDto) {
    return `This action updates a #${id} administrativeStaff`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativeStaff`;
  }
  async isAutorized(id: string): Promise<boolean> {
    const admin = await this.adminRepository.findOneBy({id});
    return admin? true: false
  }
}
