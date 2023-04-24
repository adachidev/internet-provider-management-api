import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ConnectionsService } from './connections.service';
import { ConnectionsDto } from './dto/connection.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Query('userId') userId: string,
    @Body() dto: ConnectionsDto,
  ) {
    return this.connectionsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.connectionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/client/:id')
  findByUser(@Param('id') id: string) {
    return this.connectionsService.findByClient(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Query('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: ConnectionsDto,
  ) {
    return this.connectionsService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Query('userId') userId: any, @Param('id') id: string) {
    return this.connectionsService.remove(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/freeconnection/:id')
  freePort(@Param('id') id: string) {
    return this.connectionsService.freePortById(id);
  }

}
