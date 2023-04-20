import { Module } from '@nestjs/common';
import { Box } from 'src/box/entities/box.entity';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'mongoose';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Connection, Box, User,
    ]),
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService, ClientsService],
})
export class ConnectionsModule {}
