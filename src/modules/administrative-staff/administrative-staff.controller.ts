import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeStaffService } from './administrative-staff.service';
import { CreateAdministrativeStaffDto } from './dto/create-administrative-staff.dto';
import { UpdateAdministrativeStaffDto } from './dto/update-administrative-staff.dto';

@Controller('administrative-staff')
export class AdministrativeStaffController {
  constructor(private readonly administrativeStaffService: AdministrativeStaffService) {}

  @Post()
  create(@Body() createAdministrativeStaffDto: CreateAdministrativeStaffDto) {
    return this.administrativeStaffService.create(createAdministrativeStaffDto);
  }

  @Get()
  findAll() {
    return this.administrativeStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativeStaffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativeStaffDto: UpdateAdministrativeStaffDto) {
    return this.administrativeStaffService.update(+id, updateAdministrativeStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativeStaffService.remove(+id);
  }
}
