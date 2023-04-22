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
    @Query('interface') inter: string,
    @Query('action') action: string,
    @Query('user') user: string,
    @Query('mac') mac: string,
    @Query('nas') nas: string,
    @Query('service') service: string,
    @Query('ipv4') ipv4: string,
    @Query('remoteipv6') remoteipv6: string,
    @Query('dhcpv6pd') dhcpv6pd: string,
    @Body() dto: any
  ) {
    return this.mikrotikService.create(inter, action, user, mac, nas, service, ipv4, remoteipv6, dhcpv6pd, dto)
  }
}
