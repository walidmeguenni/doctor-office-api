import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorModule } from '../doctor/doctor.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456',
      signOptions: { expiresIn: '15h' },
    }),
    DoctorModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
