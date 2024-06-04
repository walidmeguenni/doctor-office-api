import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AdministrativeStaffService } from '../../administrative-staff/administrative-staff.service';
import * as dotenv from 'dotenv';
import { DoctorService } from 'src/modules/doctor/doctor.service';
dotenv.config();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly administrativeStaffService: AdministrativeStaffService,
    private readonly doctorService: DoctorService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!this.canActive(decoded.id, decoded.role)) {
        throw new ForbiddenException('User is not active');
      }
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async canActive(id: string, role: string): Promise<boolean> {
    switch (role) {
      case 'admin':
        if (!(await this.administrativeStaffService.isAutorized(id))) {
          throw new ForbiddenException('Admin is not found');
        }
        break;
      case 'doctor':
        if (!(await this.doctorService.isAutorized(id))) {
          throw new ForbiddenException('doctor is not found');
        }
        break;
      case 'patient':
        if (!(await this.administrativeStaffService.isAutorized(id))) {
          throw new ForbiddenException('patient is not found');
        }
        break;
      default:
        throw new ForbiddenException('Invalid user role');
    }
    return true;
  }
}
