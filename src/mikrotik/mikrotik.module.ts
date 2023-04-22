import { Module } from '@nestjs/common';
import { MikrotikController } from './mikrotik.controller';
import { MikrotikService } from './mikrotik.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsLog } from './entities/connectionslog.entity';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ClientsService } from 'src/clients/clients.service';
// import { Client, ClientSchema } from 'src/clients/entities/client.entity';
// import {
//   Movement,
//   MovementSchema,
// } from 'src/movements/entities/movement.entity';
// import { MikrotikService } from './mikrotik.service';
// import { ConnectionsService } from 'src/connections/connections.service';
// import { Connection, ConnectionSchema } from 'src/connections/entities/connection.entity';
// import { Box, BoxSchema } from 'src/box/entities/box.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConnectionsLog
    ]),
  ],
  controllers: [MikrotikController],
  providers: [MikrotikService],
  exports: [MikrotikService],
})
export class MikrotikModule {}
