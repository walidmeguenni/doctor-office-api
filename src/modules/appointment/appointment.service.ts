import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to create a appointment',
      );
    }
    const patient = await this.patientService.findOne(
      createAppointmentDto.patientId,
    );
    const doctorEntity = await this.doctorService.findOne(
      createAppointmentDto.doctorId,
    );

    if (!patient || !doctorEntity) {
      throw new NotFoundException('Patient or Doctor not found');
    }

    const appointment = this.appointmentRepository.create({
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
      reason: createAppointmentDto.reason,
      patient: patient,
      doctor: doctorEntity,
    });
    return await this.appointmentRepository.save(appointment);
  }

  async findAll(request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to see a appointments',
      );
    }
    let appointments = await this.appointmentRepository.find({
      where: { patient: { id: request.user.id } },
    });
    if (appointments.length === 0) {
      appointments = await this.appointmentRepository.find({
        where: { doctor: { id: request.user.id } },
      });
    }
    return appointments;
  }

  async findOne(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    const patient = await this.patientService.isAutorized(request.user.id);
    if (!doctor && !patient) {
      throw new ForbiddenException(
        'You are not authorized to see a appointment',
      );
    }
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    request: any,
  ) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to update this appointment',
      );
    }
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to remove this appointment',
      );
    }

    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    if (appointment.doctor.id !== request.user.id) {
      throw new ForbiddenException(
        'You are not authorized to remove this appointment',
      );
    }

    await this.appointmentRepository.remove(appointment);
    return `This action removes a #${id} appointment`;
  }
}
