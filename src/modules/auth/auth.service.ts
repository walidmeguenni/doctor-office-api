import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  signup(createAuthDto: SignupDto) {
    return 'This action adds a new auth';
  }

  signin(createAuthDto: SigninDto) {
    return 'This action adds a new auth';
  }
}
