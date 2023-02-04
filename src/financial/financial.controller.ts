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
import { FinancialService } from './financial.service';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFinancialDto: CreateFinancialDto) {
    return this.financialService.create(createFinancialDto);
  }

  @Get()
  findAll() {
    return this.financialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialDto: UpdateFinancialDto,
  ) {
    return this.financialService.update(+id, updateFinancialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialService.remove(+id);
  }
}