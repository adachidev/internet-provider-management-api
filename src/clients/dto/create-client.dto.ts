import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreatePlanDto } from '../../plans/dto/create-plan.dto';
export class CreateClientDto {
  email: string;
  clientId: string; // cpf ou cnpj
  phone1: string;
  isWaPhone1: boolean;
  isAdmPhone1: boolean;
  phone2: string;
  isWaPhone2: boolean;
  isAdmPhone2: boolean;
  firstName: string;
  midName: string;
  lastName: string;
  connectionType: string; // pppoe
  enable: boolean;
  username: string;
  password: string;
  address: string;
  addressComplement: string;
  addressNumber: string;
  addressDistrito: string;
  addressCity: string;
  addressState: string;
  addressCep: string;
  latLocation: string;
  lonLocation: string;
  ipV4Address: string;
  ipV4AddressFixed: boolean;
  ipV6Address: string;
  ipV6AddressFixed: boolean;
  macAddress: string;
  branch: string; // ramal
  uptime: number;
  connected: boolean;
  birthDate: Date;
  plan: CreatePlanDto;
  observation: string;
  expirationDay: number;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  deletedAt: Date;
  userDeletedId: CreateUserDto;
  updatedAt: Date;
  userUpdatedId: CreateUserDto;
}
