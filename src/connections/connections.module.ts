import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from 'src/box/entities/box.entity';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { Connection, ConnectionSchema } from './entities/connection.entity';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Movement, MovementSchema } from 'src/movements/entities/movement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
    MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Movement.name, schema: MovementSchema }]),
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService, ClientsService],
})
export class ConnectionsModule {}
