import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { CreateBoxDto } from 'src/box/dto/create-box.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateConnectionsDto {
  client: CreateClientDto;
  latitude: string;
  longitude: string;
  box: CreateBoxDto;
  port: number;
  signal: string;
  observation: string;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  deletedAt: Date;
  userDeletedId: CreateUserDto;
  updatedAt: Date;
  userUpdatedId: CreateUserDto;
}
