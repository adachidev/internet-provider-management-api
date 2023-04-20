import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { BrasService } from './bras.service';
import { BrasDto } from './dto/bras.dto';

@Controller('bras')
export class BrasController {
  constructor(private readonly brasService: BrasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Query('userId') userId: string, @Body() dto: BrasDto) {
    return this.brasService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.brasService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brasService.findOne(id);
  }
}
