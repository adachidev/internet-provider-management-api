import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateBoxDto {
  code: string;
  latitude: string;
  longitude: string;
  address: string;
  type: string;
  capacity: number;
  signal: string;
  olt: string;
  fsp: string;
  observation: string;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  deletedAt: Date;
  userDeletedId: CreateUserDto;
  updatedAt: Date;
  userUpdatedId: CreateUserDto;
}
