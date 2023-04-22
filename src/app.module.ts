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
// import { BoxModule } from './box/box.module';
// import { ConnectionsModule } from './connections/connections.module';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ClientsModule,
    PlansModule,
    MikrotikModule,
    // BoxModule,
    // ConnectionsModule,
    // MongooseModule.forRoot(
    //   `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}`,
    //   {
    //     dbName: process.env.MONGO_DB,
    //   },
    // ),
    // MovementsModule,
    // WaModule,
    // FinancialModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
