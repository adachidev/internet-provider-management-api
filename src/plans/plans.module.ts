import { Plan, PlanSchema } from './entities/plan.entity';
import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }])
  ],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule {}
