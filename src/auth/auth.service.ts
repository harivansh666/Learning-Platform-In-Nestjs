import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService) {}

  login(): string {
    return 'hey this is login service';
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
