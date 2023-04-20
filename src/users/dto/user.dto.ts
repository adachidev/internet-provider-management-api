import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly emailVerifiedAt: string;

  @IsString()
  password: string;

  @IsNumber()
  status: Number;

  @IsString()
  phone: string;

  @IsBoolean()
  isWaPhone: boolean;

  @IsBoolean()
  enable: boolean;

  @IsString()
  codeForget: string;

  @IsString()
  accessLevel: string;

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
