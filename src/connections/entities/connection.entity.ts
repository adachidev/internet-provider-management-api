import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Box } from 'src/box/entities/box.entity';

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

  @Prop()
  port: number;

  @Prop()
  signal: string;

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
