import { CreatePlanDto } from '../../plans/dto/create-plan.dto';
import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export class CreateMovementDto {
  clientId: CreateClientDto;
  oldPlanId: CreatePlanDto;
  newPlanId: CreatePlanDto;
  reason: string;
  createdAt: Date;
  userCreatedId: CreateUserDto;
  observation: string;
}
