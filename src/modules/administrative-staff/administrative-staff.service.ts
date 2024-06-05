import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministrativeStaff } from './entities/administrative-staff.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class AdministrativeStaffService {
  constructor(
    @InjectRepository(AdministrativeStaff)
    private readonly adminRepository: Repository<AdministrativeStaff>,
  ) {}
  async create() {
    const adminSeedData = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: await hash('test', 12),
    };
    const existingAdmin = await this.adminRepository.find();
    if (existingAdmin.length === 0) {
      const adminUser = this.adminRepository.create(adminSeedData);
      const seededAdmin = await this.adminRepository.save(adminUser);
      console.log('Admin user seeded:', seededAdmin);
    } else {
      console.log('Admin user already exists');
    }
  }
  async isAutorized(id: string): Promise<boolean> {
    const admin = await this.adminRepository.findOneBy({ id });
    return admin ? true : false;
  }
}
