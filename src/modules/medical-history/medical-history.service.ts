import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { MedicalHistory } from './entities/medical-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  async create(createMedicalHistoryDto: CreateMedicalHistoryDto, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to create a medical history',
      );
    }

    const patient = await this.patientService.findOne(
      createMedicalHistoryDto.patientId,
    );
    const doctorEntity = await this.doctorService.findOne(
      createMedicalHistoryDto.doctorId,
    );

    if (!patient || !doctorEntity) {
      throw new NotFoundException('Patient or Doctor not found');
    }

    const medicalHistory = this.medicalHistoryRepository.create({
      diagnosis: createMedicalHistoryDto.diagnosis,
      treatment: createMedicalHistoryDto.treatment,
      notes: createMedicalHistoryDto.notes,
      patient: patient,
      doctor: doctorEntity,
    });

    return await this.medicalHistoryRepository.save(medicalHistory);
  }

  async findAll(request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to view medical histories',
      );
    }

    let medicalHistories = await this.medicalHistoryRepository.find({
      where: { patient: { id: request.user.id } },
    });

    if (medicalHistories.length === 0) {
      medicalHistories = await this.medicalHistoryRepository.find({
        where: { doctor: { id: request.user.id } },
      });
    }

    return medicalHistories;
  }

  async findOne(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to view this medical history',
      );
    }

    const medicalHistory = await this.medicalHistoryRepository.findOne({
      where: { id },
    });

    if (!medicalHistory) {
      throw new NotFoundException(`Medical history with ID ${id} not found`);
    }

    return medicalHistory;
  }

  async update(
    id: string,
    updateMedicalHistoryDto: UpdateMedicalHistoryDto,
    request: any,
  ) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to update this medical history',
      );
    }

    const medicalHistory = await this.medicalHistoryRepository.findOneBy({
      id,
    });
    if (!medicalHistory) {
      throw new NotFoundException(`Medical history with ID ${id} not found`);
    }

    Object.assign(medicalHistory, updateMedicalHistoryDto);
    return await this.medicalHistoryRepository.save(medicalHistory);
  }

  async remove(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to remove this medical history',
      );
    }

    const medicalHistory = await this.medicalHistoryRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!medicalHistory) {
      throw new NotFoundException(`Medical history with ID ${id} not found`);
    }

    if (medicalHistory.doctor.id !== request.user.id) {
      throw new ForbiddenException(
        'You are not authorized to remove this medical history',
      );
    }

    await this.medicalHistoryRepository.remove(medicalHistory);
    return `This action removes a #${id} medical history`;
  }
}
