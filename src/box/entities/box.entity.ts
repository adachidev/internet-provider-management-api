import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type BoxDocument = Box & Document;

@Schema()
export class Box {
  @Prop({ required: true })
  code: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  address: string;

  @Prop()
  type: string;

  @Prop()
  capacity: number;

  @Prop()
  signal: string;

  @Prop()
  olt: string;

  @Prop()
  fsp: string;

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

export const BoxSchema = SchemaFactory.createForClass(Box);
