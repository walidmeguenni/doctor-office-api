import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SigninDto } from './dto/signin.dto';
import { Doctor } from '../doctor/entities/doctor.entity';
import { AdministrativeStaff } from '../administrative-staff/entities/administrative-staff.entity';
import { Patient } from '../patient/entities/patient.entity';
import { patientSignupDto } from './dto/patientSignup.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(AdministrativeStaff)
    private readonly adminRepository: Repository<AdministrativeStaff>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private jwtService: JwtService,
  ) {}

  async adminsignin(
    input: SigninDto,
  ): Promise<{ admin: AdministrativeStaff; token: string }> {
    const { email, password } = input;
    const isAdminExist = await this.adminRepository.findOneBy({ email });
    if (!isAdminExist) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordValid = await compare(password, isAdminExist.password);
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

  async patientSignin(
    input: SigninDto,
  ): Promise<{ patient: Patient; token: string }> {
    const { email, password } = input;
    const isPatientExist = await this.patientRepository.findOneBy({ email });
    if (!isPatientExist) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordValid = await compare(password, isPatientExist.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = this.jwtService.sign({
      id: isPatientExist.id || 1,
      email: isPatientExist.email,
      firstName: isPatientExist.firstName,
      lastName: isPatientExist.lastName,
      role: isPatientExist.role,
    });
    return { patient: isPatientExist, token };
  }

  async patientSignup(
    signupDto: patientSignupDto,
  ): Promise<{ patient: Patient; token: string }> {
    const { email, password, firstName, lastName, address, dateOfBirth } =
      signupDto;

    const isPatientExist = await this.patientRepository.findOneBy({ email });
    if (isPatientExist) {
      throw new ConflictException('Email already exists');
    }
    const roundSlat = 12;
    const hashedPassword = await hash(password, roundSlat);

    const patient = this.patientRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      dateOfBirth,
    });

    await this.patientRepository.save(patient);

    const token = this.jwtService.sign({
      id: patient.id,
      email: patient.email,
      firstName: patient.firstName,
      lastName: patient.lastName,
      role: 'patient',
    });

    return { patient, token };
  }
}
