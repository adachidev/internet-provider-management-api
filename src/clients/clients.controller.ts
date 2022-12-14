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
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Query('userId') userId: any,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(userId, createClientDto);
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
  @Get(':username/username')
  findUser(@Param('username') id: string) {
    return this.clientsService.findUserName(id);
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
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(userId, id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: string) {
    return this.clientsService.remove(userId, id);
  }
}
