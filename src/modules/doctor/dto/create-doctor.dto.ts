import { IsEmail, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  specialization: string;
  @IsString()
  password: string;
}
