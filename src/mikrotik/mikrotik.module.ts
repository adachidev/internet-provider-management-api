import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';
import {
  Movement,
  MovementSchema,
} from 'src/movements/entities/movement.entity';
import { MikrotikService } from './mikrotik.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
    ]),
  ],
  providers: [ClientsService, MikrotikService],
})
export class MikrotikModule {}
