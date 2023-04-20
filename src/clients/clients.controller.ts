import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Query('userId') userId: any,
    @Body() dto: ClientDto,
  ) {
    return this.clientsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':phone/phone')
  findPhone(@Param('phone') id: string) {
    return this.clientsService.findPhone(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Query('userId') userId: any,
    @Param('id') id: string,
    @Body() dto: ClientDto,
  ) {
    return this.clientsService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: string) {
    return this.clientsService.remove(userId, id);
  }
}
