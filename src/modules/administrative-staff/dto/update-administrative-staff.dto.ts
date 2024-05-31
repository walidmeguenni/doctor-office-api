import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativeStaffDto } from './create-administrative-staff.dto';

export class UpdateAdministrativeStaffDto extends PartialType(CreateAdministrativeStaffDto) {}
