import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { AdministrativeStaffService } from '../administrative-staff/administrative-staff.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly doctorService: DoctorService,
    private readonly administrativeStaffService: AdministrativeStaffService,
  ) {}
  async findAll(request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const admin = await this.administrativeStaffService.isAutorized(
      request.user.id,
    );
    if (!doctor && !admin) {
      throw new ForbiddenException('You are not authorized to see a patients');
    }
    const patients = await this.patientRepository.find();
    return patients;
  }

  async findOne(id: string, request?: any): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (request) {
      const isPatientExist = await this.isAutorized(request.user.id);
      console.log(!isPatientExist && patient?.id !== request.user.id);
      if (isPatientExist && patient?.id !== request.user.id) {
        throw new ForbiddenException(
          'You are not authorized to see a info patient',
        );
      }
    }
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto, request: any) {
    const patient = await this.patientRepository.findOneBy({ id });
    const isPatientExist = await this.isAutorized(request.user.id);
    if (isPatientExist && patient.id !== request.user.id) {
      throw new ForbiddenException(
        'You are not authorized to see a info patient',
      );
    }
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    Object.assign(patient, updatePatientDto);
    return patient;
  }

  async isAutorized(id: string): Promise<boolean> {
    const admin = await this.patientRepository.findOneBy({ id });
    return admin ? true : false;
  }
}
