import { IsDate, IsNumber, IsString } from "class-validator";
import { UserDto } from "src/users/dto/user.dto";

export class PlanDto {
  @IsString()
  id: string;

  @IsString()
  name: string; // Nome do plano

  @IsNumber()
  value: number; // Valor

  @IsNumber()
  download: number; // Velocidade de Download

  @IsNumber()
  upload: number; // Velocidade de Download

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
