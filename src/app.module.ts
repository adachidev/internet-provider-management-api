import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';
import { MovementsModule } from './movements/movements.module';
import { UsersModule } from './users/users.module';
import { WaModule } from './wa/wa.module';

dotenv.config();

const mongoData = process.env.LD_MONGO_USER
  ? `mongodb://${process.env.LD_MONGO_USER}:${process.env.LD_MONGO_PASS}@${process.env.LD_MONGO_URL}:${process.env.LD_MONGO_PORT}/${process.env.LD_MONGO_DB}`
  : `mongodb://${process.env.LD_MONGO_URL}:${process.env.LD_MONGO_PORT}/${process.env.LD_MONGO_DB}`;

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(mongoData),
    ClientsModule,
    PlansModule,
    MovementsModule,
    UsersModule,
    WaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
