import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Box } from 'src/box/entities/box.entity';
import { Plan } from 'src/plans/entities/plan.entity';

export type ConnectionDocument = Connection & Document;

@Schema()
export class Connection {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Box' })
  box: Box;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  plan: Plan;

  @Prop()
  port: number;

  @Prop()
  signal: string;

  @Prop({ required: true, default: 'ftth' })
  type: string;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop()
  branch: string; // ramal

  @Prop()
  ipV4Address: string;

  @Prop({ default: false })
  ipV4AddressFixed: boolean;

  @Prop()
  ipV6Address: string;

  @Prop({ default: false })
  ipV6AddressFixed: boolean;

  @Prop()
  macAddress: string;

  @Prop()
  observation: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userCreatedId: User;

  @Prop({ type: Date })
  deletedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userDeletedId: User;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userUpdatedId: User;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
