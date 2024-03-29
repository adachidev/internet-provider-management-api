import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import {
  Controller,
  UseGuards,
  Request,
  Post,
  Query,
  Get,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './shared/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Body() data: any) {
    return this.authService.profile(data.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Body() data: any) {
    return this.authService.refreshToken(data.token);
  }
}
