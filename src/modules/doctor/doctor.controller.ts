import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto, @Req() request: any) {
    return await this.doctorService.create(createDoctorDto, request);
  }
}
