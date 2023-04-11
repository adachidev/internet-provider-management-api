import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';
import {
  Movement,
  MovementSchema,
} from 'src/movements/entities/movement.entity';
import { MikrotikService } from './mikrotik.service';
import { ConnectionsService } from 'src/connections/connections.service';
import { Connection, ConnectionSchema } from 'src/connections/entities/connection.entity';
import { Box, BoxSchema } from 'src/box/entities/box.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Connection.name, schema: ConnectionSchema }]),
    MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }]),
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
    ]),
  ],
  providers: [ClientsService, MikrotikService, ConnectionsService],
})
export class MikrotikModule {}
