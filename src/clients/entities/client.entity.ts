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

  @Prop({ default: true }) // para integração com whatsapp
  isAdmPhone: boolean;

  @Prop()
  phone2: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  midName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: true }) // 1 - pré cadastro, 2 - ativo, 3 - inativo
  status: number;

  @Prop() // CPF ou CNPJ
  registerNumber: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop() // Rua ....
  address: string;

  @Prop() // 1° Andar ou AP 135
  addressComplement: string;

  @Prop() // Ponto de refer~encia
  addressReference: string;

  @Prop() // jm - Condominio JM
  addressRegion: string;

  @Prop() // Número
  addressNumber: string;

  @Prop() // Bairro
  addressDistrito: string;

  @Prop() // Cidade
  addressCity: string;

  @Prop() // Estado
  addressState: string;

  @Prop()
  addressCep: string;

  @Prop() // Latitude
  latLocation: string;

  @Prop() // Longitude
  lonLocation: string;

  @Prop({ type: Date }) // Data de aniversário
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
