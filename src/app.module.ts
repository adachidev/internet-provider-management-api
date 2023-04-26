import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { ClientsModule } from './clients/clients.module';
import { PlansModule } from './plans/plans.module';
import { MikrotikModule } from './mikrotik/mikrotik.module';
import { BoxModule } from './box/box.module';
import { ConnectionsModule } from './connections/connections.module';
import { FinancialModule } from './financial/financial.module';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),    
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ClientsModule,
    PlansModule,
    MikrotikModule,
    BoxModule,
    ConnectionsModule,
    FinancialModule,
    // MovementsModule,
    // WaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
