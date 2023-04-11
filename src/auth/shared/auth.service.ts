import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, userPassword: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) return { error: 'INVALID_EMAIL'}

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (user && !isPasswordValid) return { error: 'INVALID_PASSWORD'}

    if (user && isPasswordValid) {
      const { _id, firstName, lastName, email } = user;
      return { id: _id, firstName, lastName, email };
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload),
      Issuer: process.env.ADMIN_URL,
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async profile(token: string): Promise<any> {
    return this.jwtService.decode(token)
  }

  async refreshToken(token: string): Promise<any> {
    console.log('[refreshToken]',token)
    return null
  }
}
