import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ access_Token: string }> {
    const user = await this.UserService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_Token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: RegisterDto): Promise<RegisterDto> {
    /**
     * 1. email existed or not
     * 2. Hash the password
     * 3. store the user into db
     * 4 token Generate
     * 5. send token into response
     */

    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.UserService.createUser({ ...createUserDto, password: hash });
  }
}
