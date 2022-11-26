import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(
    @Query('userId') userId: any,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(userId, createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Get(':username/username')
  findUser(@Param('username') id: string) {
    return this.clientsService.findUserName(id);
  }

  @Get(':phone/phone')
  findPhone(@Param('phone') id: string) {
    return this.clientsService.findPhone(id);
  }

  @Put(':id')
  update(
    @Query('userId') userId: any,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(userId, id, updateClientDto);
  }

  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: string) {
    return this.clientsService.remove(userId, id);
  }
}
