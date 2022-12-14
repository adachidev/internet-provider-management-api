export class CreateUserDto {
  email: string;
  phone: string;
  isWaPhone: boolean;
  firstName: string;
  midName: string;
  lastName: string;
  enable: boolean;
  username: string;
  password: string;
  status?: number;
  code?: string;
  accessLevel: string;
  observation: string;
  createdAt: Date;
  userCreatedId: string;
  deletedAt: Date;
  userDeletedId: string;
  updatedAt: Date;
  userUpdatedId: string;
}
