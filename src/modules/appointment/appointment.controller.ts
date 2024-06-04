import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() request: any,
  ) {
    return await this.appointmentService.create(createAppointmentDto, request);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: any) {
    return await this.appointmentService.findAll(request);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: any) {
    return await this.appointmentService.findOne(id, request);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Req() request: any,
  ) {
    return await this.appointmentService.update(
      id,
      updateAppointmentDto,
      request,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: any) {
    return await this.appointmentService.remove(id, request);
  }
}
