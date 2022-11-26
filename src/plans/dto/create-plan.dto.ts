export class CreatePlanDto {
  name: string; // Nome do plano
  value: number; // Valor
  download: number; // Velocidade de Download
  upload: number; // Velocidade de Download
  createdAt: Date;
  userCreatedId: string;
  deletedAt: Date;
  userDeletedId: string;
  updatedAt: Date;
  userUpdatedId: string;
  observation: string;
}
