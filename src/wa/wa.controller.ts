/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Interceptor } from 'src/Interceptor';
import { WaService } from './wa.service';

// @UseInterceptors(Interceptor)
@Controller('wa')
export class WaController {
  constructor(private readonly waService: WaService) {}

  @Get()
  findAll() {
    console.log('[GET]');
    return null;
  }

  @Post()
  create(@Body() body: any) {
    return this.waService.sendText(body.celular, body.mensagem, body.token);
  }
}
