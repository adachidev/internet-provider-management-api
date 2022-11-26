export class CreateUserDto {
  email: string;
  phone1: string;
  isWaPhone1: boolean;
  isAdmPhone1: boolean;
  phone2: string;
  isWaPhone2: boolean;
  isAdmPhone2: boolean;
  firstName: string;
  midName: string;
  lastName: string;
  enable: boolean;
  username: string;
  password: string;
  accessLevel: string;
  observation: string;
  createdAt: Date;
  userCreatedId: string;
  deletedAt: Date;
  userDeletedId: string;
  updatedAt: Date;
  userUpdatedId: string;
}
