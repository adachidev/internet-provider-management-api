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

@UseInterceptors(Interceptor)
@Controller('wa')
export class WaController {
  @Get()
  findAll() {
    console.log('[GET]');
    return null;
  }

  @Post()
  create(@Body() body: any) {
    console.log('[POST]', { body });
    return null;
  }
}
