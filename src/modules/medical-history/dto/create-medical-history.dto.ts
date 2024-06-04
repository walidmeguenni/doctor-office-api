import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMedicalHistoryDto {
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @IsUUID()
  @IsNotEmpty()
  doctorId: string;
}
