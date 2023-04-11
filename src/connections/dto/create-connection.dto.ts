import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { CreateBoxDto } from 'src/box/dto/create-box.dto';
import { CreatePlanDto } from 'src/plans/dto/create-plan.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateConnectionsDto {
  client: any;
  latitude: string;
  longitude: string;
  box: CreateBoxDto;
  plan: CreatePlanDto;
  port: number;
  phone: string;
  signal: string;
  observation: string;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  deletedAt: Date;
  userDeletedId: CreateUserDto;
  updatedAt: Date;
  userUpdatedId: CreateUserDto;
}
