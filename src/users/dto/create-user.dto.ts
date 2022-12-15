import { kMaxLength } from 'buffer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

//https://github.com/typestack/class-validator

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  isWaPhone: boolean;

  @IsString()
  firstName: string;

  @IsString()
  midName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  enable: boolean;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNumber()
  status?: number;

  @IsString()
  code?: string;

  @IsString()
  accessLevel: string;

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
