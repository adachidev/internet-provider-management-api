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
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Query('userId') userId: string, @Body() createBoxDto: CreateBoxDto) {
    return this.boxService.create(userId, createBoxDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.boxService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxService.findOne(id);
  }
}
