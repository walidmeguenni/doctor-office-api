import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin-signup')
  signup(@Body() createAuthDto: SigninDto) {
    return this.authService.adminsignup(createAuthDto);
  }

  @Post('doctor-signin')
  async signin(@Body() input: SigninDto) {
    return await this.authService.doctorsignin(input);
  }
}
