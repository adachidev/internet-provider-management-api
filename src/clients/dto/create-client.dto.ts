import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreatePlanDto } from '../../plans/dto/create-plan.dto';
export class CreateClientDto {
  email: string;
  clientId: string; // cpf ou cnpj
  phone: string;
  isWaPhone: boolean;
  isAdmPhone: boolean;
  phone2: string;
  isWaPhone2: boolean;
  isAdmPhone2: boolean;
  firstName: string;
  midName: string;
  lastName: string;
  registerNumber: string;
  enable: boolean;
  address: string;
  addressComplement: string;
  addressNumber: string;
  addressDistrito: string;
  addressCity: string;
  addressState: string;
  addressCep: string;
  latLocation: string;
  lonLocation: string;
  birthDate: Date;
  observation: string;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  deletedAt: Date;
  userDeletedId: CreateUserDto;
  updatedAt: Date;
  userUpdatedId: CreateUserDto;
}
