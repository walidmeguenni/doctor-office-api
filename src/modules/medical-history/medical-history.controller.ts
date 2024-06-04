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
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
    @Req() request: any,
  ) {
    return await this.medicalHistoryService.create(
      createMedicalHistoryDto,
      request,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: any) {
    return await this.medicalHistoryService.findAll(request);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: any) {
    return await this.medicalHistoryService.findOne(id, request);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto,
    @Req() request: any,
  ) {
    return await this.medicalHistoryService.update(
      id,
      updateMedicalHistoryDto,
      request,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: any) {
    return await this.medicalHistoryService.remove(id, request);
  }
}
