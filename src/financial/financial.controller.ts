import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { GerNetService } from './gernet.service';

@Controller('financial')
export class FinancialController {
  constructor(private readonly gernetService: GerNetService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/gettoken')
  test() {
    return null
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFinancialDto: CreateFinancialDto) {
    return this.gernetService.create();
  }


}
