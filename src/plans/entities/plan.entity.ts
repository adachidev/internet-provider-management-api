import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema()
export class Plan {
  @Prop()
  name: string; // Nome do plano

  @Prop()
  value: number; // Valor

  @Prop()
  download: number; // Velocidade de Download

  @Prop()
  upload: number; // Velocidade de Upload

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

  @Prop()
  observation: string;

}

export const PlanSchema = SchemaFactory.createForClass(Plan);
