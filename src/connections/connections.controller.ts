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
import { ConnectionsService } from './connections.service';
import { CreateConnectionsDto } from './dto/create-connection.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Query('userId') userId: string,
    @Body() createConnectionsDto: CreateConnectionsDto,
  ) {
    return this.connectionsService.create(userId, createConnectionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.connectionsService.findAll();
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('/client/:id')
  findByUser(@Param('id') id: string) {
    return this.connectionsService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectionsService.findOne(id);
  }
}
