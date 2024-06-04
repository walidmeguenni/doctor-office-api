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
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPrescriptionDto: CreatePrescriptionDto,
    @Req() request: any,
  ) {
    return await this.prescriptionService.create(
      createPrescriptionDto,
      request,
    );
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: any) {
    return await this.prescriptionService.findAll(request);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: any) {
    return await this.prescriptionService.findOne(id, request);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    @Req() request: any,
  ) {
    return await this.prescriptionService.update(
      id,
      updatePrescriptionDto,
      request,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: any) {
    return await this.prescriptionService.remove(id, request);
  }
}
