import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto, @Req() request: any) {
    return await this.doctorService.create(createDoctorDto, request);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.doctorService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doctorService.remove(id);
  }
}
