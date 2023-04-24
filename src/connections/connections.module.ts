import { Module } from '@nestjs/common';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { Box } from 'src/box/entities/box.entity';
import { User } from 'src/users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Connection, Box, User, Client, Plan
    ]),
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService, ClientsService],
})
export class ConnectionsModule {}
