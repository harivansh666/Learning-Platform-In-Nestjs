import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Role } from './user.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(createUserDto: RegisterDto): Promise<RegisterDto> {
    try {
      const user = await this.userModel.create({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
        role: Role.STUDENT,
      });

      return user;
    } catch (error: unknown) {
      const e = error as { code?: number };

      if (e.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
