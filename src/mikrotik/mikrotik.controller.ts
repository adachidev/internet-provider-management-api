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
import { RadiusService } from './radius.service';

@Controller('mikrotik')
export class MikrotikController {
  constructor(
    private readonly mikrotikService: MikrotikService,
    private readonly radiusService: RadiusService
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

  @Post('disconnect/:id')
  disconnectRequest(
    @Param('id') id: string
  ) {
    return this.radiusService.disconnectRequest(id)
  }
}
