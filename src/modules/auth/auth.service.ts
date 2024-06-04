import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SigninDto } from './dto/signin.dto';
import { Doctor } from '../doctor/entities/doctor.entity';
import { AdministrativeStaff } from '../administrative-staff/entities/administrative-staff.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(AdministrativeStaff)
    private readonly adminRepository: Repository<AdministrativeStaff>,
    private jwtService: JwtService,
  ) {}

  async adminsignup(
    input: SigninDto,
  ): Promise<{ admin: AdministrativeStaff; token: string }> {
    const { email, password } = input;
    const isAdminExist = await this.adminRepository.findOneBy({ email });
    if (!isAdminExist) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordValid = await compare(password, isAdminExist.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = this.jwtService.sign({
      id: isAdminExist.id || 1,
      email: isAdminExist.email,
      firstName: isAdminExist.firstName,
      lastName: isAdminExist.lastName,
      role: isAdminExist.role,
    });
    return { admin: isAdminExist, token };
  }

  async doctorsignin(
    input: SigninDto,
  ): Promise<{ doctor: Doctor; token: string }> {
    const { email, password } = input;
    const isDoctorExist = await this.doctorRepository.findOneBy({ email });
    if (!isDoctorExist) {
      throw new UnauthorizedException('Invalid Credentials 1');
    }
    const isPasswordValid = await compare(password, isDoctorExist.password);
    if (isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = this.jwtService.sign({
      id: isDoctorExist.id || 1,
      email: isDoctorExist.email,
      firstName: isDoctorExist.firstName,
      lastName: isDoctorExist.lastName,
      role: isDoctorExist.role,
    });
    return { doctor: isDoctorExist, token };
  }
}
