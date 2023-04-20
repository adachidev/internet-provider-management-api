import { PlanDto } from './../../plans/dto/plan.dto';
import { IsDate, IsString } from "class-validator";
import { BoxDto } from "src/box/dto/box.dto";
import { ClientDto } from 'src/clients/dto/client.dto';

export class ConnectionsDto {
  @IsString()
  id: string;

  client: ClientDto;

  @IsString()
  clientId: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  boxId: string;

  plan: PlanDto;

  @IsString()
  planId: string;

  @IsString()
  port: number;

  @IsString()
  signal: string;

  @IsString()
  type: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  ipV4Address: string;

  @IsString()
  ipV4AddressFixed: boolean;

  @IsString()
  ipV6Address: string;

  @IsString()
  ipV6AddressFixed: boolean;

  @IsString()
  observation: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  userCreatedId: string;

  @IsDate()
  deletedAt: Date;

  @IsString()
  userDeletedId: string;

  @IsDate()
  updatedAt: Date;

  @IsString()
  userUpdatedId: string;
}
