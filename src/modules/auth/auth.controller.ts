import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: SignupDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('signin')
  signin(@Body() createAuthDto: SigninDto) {
    return this.authService.signin(createAuthDto);
  }
}
