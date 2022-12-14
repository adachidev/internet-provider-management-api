import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  isWaPhone: boolean;

  @Prop()
  isAdmPhone: boolean;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  midName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: true })
  enable: boolean;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 3 })
  status: number;

  @Prop({ required: false, default: '' })
  code: string;

  @Prop({ default: 'user' })
  accessLevel: string;

  @Prop()
  observation: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop()
  userCreatedId: string;

  @Prop({ type: Date })
  deletedAt: Date;

  @Prop()
  userDeletedId: string;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop()
  userUpdatedId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
