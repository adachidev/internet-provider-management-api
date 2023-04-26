import { Module } from '@nestjs/common';
import { MikrotikController } from './mikrotik.controller';
import { MikrotikService } from './mikrotik.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsLog } from './entities/connectionslog.entity';
import { RadiusService } from './radius.service';
import { Client } from 'src/clients/entities/client.entity';
import { Connection } from 'src/connections/entities/connection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConnectionsLog, Connection, Client
    ]),
  ],
  controllers: [MikrotikController],
  providers: [MikrotikService, RadiusService],
  exports: [MikrotikService],
})
export class MikrotikModule {}
