import { Injectable } from '@nestjs/common';
import { CreateAdministrativeStaffDto } from './dto/create-administrative-staff.dto';
import { UpdateAdministrativeStaffDto } from './dto/update-administrative-staff.dto';

@Injectable()
export class AdministrativeStaffService {
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
}
