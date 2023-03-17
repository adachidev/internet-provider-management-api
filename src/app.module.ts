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
import { FinancialModule } from './financial/financial.module';
import { MikrotikModule } from './mikrotik/mikrotik.module';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}`,
      {
        dbName: process.env.MONGO_DB,
      },
    ),
    ClientsModule,
    PlansModule,
    MovementsModule,
    UsersModule,
    WaModule,
    BoxModule,
    ConnectionsModule,
    FinancialModule,
    MikrotikModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
