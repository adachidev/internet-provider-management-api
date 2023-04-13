import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'src/connections/entities/connection.entity';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  isWaPhone: boolean;

  @Prop({ default: true })
  isAdmPhone: boolean;

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

  @Prop({ default: true })
  enable: boolean;

  @Prop()
  registerNumber: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  addressComplement: string;

  @Prop()
  addressRegion: string;

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

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Connection' })
  connections: Connection[];

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
}

export const ClientSchema = SchemaFactory.createForClass(Client);
