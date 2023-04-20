import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from './dto/plan.dto';

import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: PlanDto,
    @Query('userId') userId: any,
  ) {
    return this.plansService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.plansService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Query('userId') userId: any,
    @Body() dto: PlanDto,
  ) {
    return this.plansService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query('userId') userId: any,
  ) {
    return this.plansService.remove(userId, id);
  }
}
