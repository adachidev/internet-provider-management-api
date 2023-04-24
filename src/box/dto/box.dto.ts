import { IsDate, IsNumber, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class BoxDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  address: string;

  @IsString()
  type: string;

  @IsNumber()
  capacity: number;

  @IsString()
  signal: string;

  @IsString()
  olt: string;

  @IsString()
  oltId: string;

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
