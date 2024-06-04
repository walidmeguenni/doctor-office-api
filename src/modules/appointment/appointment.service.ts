import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorService: DoctorService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, request: any) {
    const doctor = await this.doctorService.isAutorized(request.user.id);
    if (!doctor) {
      throw new ForbiddenException(
        'You are not authorized to create a appointment',
      );
    }
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: { id: createAppointmentDto.patient },
      doctor: { id: createAppointmentDto.doctor },
    });
    return await this.appointmentRepository.save(appointment);
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
