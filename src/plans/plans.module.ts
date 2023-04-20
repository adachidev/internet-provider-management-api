import { Plan } from './entities/plan.entity';
import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Client } from 'src/clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client, Plan,
    ]),

  ],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule {}
