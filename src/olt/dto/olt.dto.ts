import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class OltDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  vendor: string;

  @IsString()
  model: string;

  @IsString()
  status: string;

  @IsNumber()
  interfaces: number;

  @IsString()
  ipv4manager: string;

  @IsString()
  macmanager: string;

  @IsString()
  brasId: string;

  @IsString()
  observation: string;

  @IsString()
  createdAt: Date;

  userCreated: UserDto;

  @IsString()
  userCreatedId: string;

  @IsDate()
  deletedAt: Date;

  userDeleted: UserDto;
  
  @IsString()
  userDeletedId: string;

  @IsDate()
  updatedAt: Date;

  userUpdated: UserDto;

  @IsString()
  userUpdatedId: string;
}
