import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/users/entities/user.entity';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  clientId: string;

  @Prop()
  email: string;

  @Prop()
  userId: string;

  @Prop()
  phone1: string;

  @Prop({ default: false })
  isWaPhone1: boolean;

  @Prop({ default: true })
  isAdmPhone1: boolean;

  @Prop()
  phone2: string;

  @Prop({ default: false })
  isWaPhone2: boolean;

  @Prop({ default: false })
  isAdmPhone2: boolean;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  midName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  connectionType: string;

  @Prop({ default: true })
  enable: boolean;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  addressComplement: string;

  @Prop()
  addressNumber: string;

  @Prop()
  addressDistrito: string;

  @Prop()
  addressCity: string;

  @Prop()
  addressState: string;

  @Prop()
  addressCep: string;

  @Prop()
  latLocation: string;

  @Prop()
  lonLocation: string;

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
  branch: string; // ramal

  @Prop()
  uptime: number;

  @Prop()
  connected: boolean;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  plan: Plan;

  @Prop({ type: Date })
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

  @Prop()
  observation: string;

  @Prop()
  expirationDay: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
