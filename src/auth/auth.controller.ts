import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')

    register() {
        return this.authService.register();
    }

    @Get()
    login() {
        return this.authService.login();
    }
}
