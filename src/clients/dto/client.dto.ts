import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Connection } from "src/connections/entities/connection.entity";
import { UserDto } from "src/users/dto/user.dto";

export class ClientDto {
  @IsString()
  id: string;

  @IsString()
  readonly email: string;

  @IsString()
  phone: string;

  @IsBoolean()
  isWaPhone: boolean;

  @IsBoolean()
  isAdmPhone: boolean;

  @IsString()
  phone2: string;

  @IsString()
  firstName: string;

  @IsString()
  midName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  status: number;

  @IsString()
  registerNumber: string; // cpf ou cnpj

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString() // Rua ....
  address: string;

  @IsString() // 1° Andar ou AP 135
  addressComplement: string;

  @IsString() // Ponto de refer~encia
  addressReference: string;

  @IsString() // jm - Condominio JM
  addressRegion: string;

  @IsString() // Número
  addressNumber: string;

  @IsString() // Bairro
  addressDistrito: string;

  @IsString() // Cidade
  addressCity: string;

  @IsString() // Estado
  addressState: string;

  @IsString()
  addressCep: string;

  @IsString() // Latitude
  latLocation: string;

  @IsString() // Longitude
  lonLocation: string;

  @IsDate() // Data de aniversário
  birthDate: Date;

  connections: Connection[];

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
