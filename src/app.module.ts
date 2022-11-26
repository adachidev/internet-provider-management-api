import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';
import { MovementsModule } from './movements/movements.module';
import { UsersModule } from './users/users.module';

dotenv.config();

const mongoData = process.env.MONGO_USER
  ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
  : `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoData),
    ClientsModule,
    PlansModule,
    MovementsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
