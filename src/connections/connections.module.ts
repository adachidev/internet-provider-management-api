import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from 'src/box/entities/box.entity';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { Connection, ConnectionSchema } from './entities/connection.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
    MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }]),
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
