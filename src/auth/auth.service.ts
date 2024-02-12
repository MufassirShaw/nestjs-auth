import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(name: string, userId: string) {
    const payload: IJwtPayload = {
      name,
      sub: userId,
    };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    const alreadyExists = await this.usersService.findByEmail(email);

    if (alreadyExists) {
      throw new ConflictException('Email already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return this.generateToken(name, user.id);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Incorrect email or password');
    }

    return this.generateToken(user.name, user.id);
  }
}
