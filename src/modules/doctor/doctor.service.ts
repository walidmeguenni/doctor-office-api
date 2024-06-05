import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { AdministrativeStaffService } from '../administrative-staff/administrative-staff.service';
import { hash } from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly administrativeStaffService: AdministrativeStaffService,
  ) {}

  async create(
    createDoctorDto: CreateDoctorDto,
    request: any,
  ): Promise<Doctor> {
    console.log(createDoctorDto);
    const admin = this.administrativeStaffService.isAutorized(request.user.id);
    if (!admin) {
      throw new ForbiddenException('You are not authorized to create a doctor');
    }
    const roundSlat = 12;
    const hashedPassword = await hash(createDoctorDto.password, roundSlat);
    const doctor = this.doctorRepository.create({
      email: createDoctorDto.email,
      firstName: createDoctorDto.firstName,
      lastName: createDoctorDto.lastName,
      specialization: createDoctorDto.specialization,
      password: hashedPassword,
    });
    return await this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async findOne(id: string): Promise<Doctor> {
    return await this.doctorRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const deletedDoctor = await this.doctorRepository.findOne({
      where: { id },
    });
    if (!deletedDoctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    await this.doctorRepository.remove(deletedDoctor);
    return {
      statusCode: 200,
      message: `Doctor ${deletedDoctor.firstName} ${deletedDoctor.lastName} with ID ${id} removed`,
    };
  }
  async isAutorized(id: string): Promise<boolean> {
    const admin = await this.doctorRepository.findOneBy({ id });
    return admin ? true : false;
  }
}
