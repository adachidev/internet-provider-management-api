import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { MikrotikService } from './mikrotik.service';

@Controller('mikrotik')
export class MikrotikController {
  constructor(
    private readonly mikrotikService: MikrotikService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/connectionslog')
  create(
    @Body() dto: any
  ) {
    return this.mikrotikService.create(dto)
  }

  @Get('/connectionslog')
  findAll() {
    return this.mikrotikService.findAll()
  }
}
