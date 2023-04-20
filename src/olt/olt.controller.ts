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
import { OltService } from './olt.service';
import { OltDto } from './dto/olt.dto';

@Controller('olt')
export class OltController {
  constructor(private readonly oltService: OltService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Query('userId') userId: string, @Body() dto: OltDto) {
    return this.oltService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.oltService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oltService.findOne(id);
  }
}
