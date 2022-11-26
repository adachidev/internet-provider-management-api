import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from 'src/clients/entities/client.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/users/entities/user.entity';

export type MovementDocument = Movement & Document;

@Schema()
export class Movement {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  clientId: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  oldPlanId: Plan;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  newPlanId: Plan;

  @Prop()
  reason: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userCreatedId: User;

  @Prop()
  observation: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
