import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to create an Prescription',
      );
    }

    const patient = await this.patientService.findOne(
      createPrescriptionDto.patientId,
    );
    const doctorEntity = await this.doctorService.findOne(
      createPrescriptionDto.doctorId,
    );

    if (!patient || !doctorEntity) {
      throw new NotFoundException('Patient or Doctor not found');
    }
    const prescription = this.prescriptionRepository.create({
      medication: createPrescriptionDto.medication,
      dosage: createPrescriptionDto.dosage,
      frequency: createPrescriptionDto.frequency,
      startDate: createPrescriptionDto.startDate,
      endDate: createPrescriptionDto.endDate,
      patient: patient,
      doctor: doctorEntity,
    });

    return await this.prescriptionRepository.save(prescription);
  }

  async findAll(request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to see an prescriptions',
      );
    }
    let prescriptions = await this.prescriptionRepository.find({
      where: { patient: { id: request.user.id } },
    });
    if (prescriptions.length === 0) {
      prescriptions = await this.prescriptionRepository.find({
        where: { doctor: { id: request.user.id } },
      });
    }
    return prescriptions;
  }

  async findOne(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to see an prescription',
      );
    }
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
    });
    if (!prescription) {
      throw new NotFoundException(`prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(
    id: string,
    updatePrescriptionDto: UpdatePrescriptionDto,
    request: any,
  ) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to update this prescription',
      );
    }
    const prescription = await this.prescriptionRepository.findOneBy({ id });
    if (!prescription) {
      throw new NotFoundException(`prescription with ID ${id} not found`);
    }
    Object.assign(prescription, updatePrescriptionDto);
    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to remove this prescription',
      );
    }

    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!prescription) {
      throw new NotFoundException(`prescription with ID ${id} not found`);
    }
    if (prescription.doctor.id !== request.user.id) {
      throw new ForbiddenException(
        'You are not authorized to remove this prescription',
      );
    }

    await this.prescriptionRepository.remove(prescription);
    return `This action removes a #${id} prescription`;
  }
}
