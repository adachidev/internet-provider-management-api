import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';
import { MovementsModule } from './movements/movements.module';
import { UsersModule } from './users/users.module';
import { WaModule } from './wa/wa.module';
import { BoxModule } from './box/box.module';
import { ConnectionsModule } from './connections/connections.module';

dotenv.config();

const mongoData = process.env.MONGO_USER
  ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
  : `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(mongoData),
    ClientsModule,
    PlansModule,
    MovementsModule,
    UsersModule,
    WaModule,
    BoxModule,
    ConnectionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
