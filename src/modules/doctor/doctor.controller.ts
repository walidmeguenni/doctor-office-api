import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doctorService.remove(id);
  }
}
