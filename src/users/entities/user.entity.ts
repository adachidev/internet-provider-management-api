import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone1: string;

  @Prop()
  isWaPhone1: boolean;

  @Prop()
  isAdmPhone1: boolean;

  @Prop()
  phone2: string;

  @Prop()
  isWaPhone2: boolean;

  @Prop()
  isAdmPhone2: boolean;

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
