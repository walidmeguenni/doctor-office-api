import { patientSignupDto } from './dto/patientSignup.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin-signin')
  signup(@Body() createAuthDto: SigninDto) {
    return this.authService.adminsignin(createAuthDto);
  }

  @Post('doctor-signin')
  async signin(@Body() input: SigninDto) {
    return await this.authService.doctorsignin(input);
  }
  @Post('patient-signin')
  async patientSignin(@Body() input: SigninDto) {
    return await this.authService.patientSignin(input);
  }
  @Post('patient-signup')
  async patientSignup(@Body() input: patientSignupDto) {
    return await this.authService.patientSignup(input);
  }
}
