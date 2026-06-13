import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: RegisterDto) {
    console.log('createUserDto', createUserDto);
    return this.authService.register(createUserDto);
  }

  @Post()
  login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto);
  }
}
