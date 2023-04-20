import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'plan' })
export class Plan {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;
  
  @Column({ length: 120 })
  name: string; // Nome do plano

  @Column()
  value: number; // Valor

  @Column()
  download: number; // Velocidade de Download

  @Column()
  upload: number; // Velocidade de Upload

  @Column()
  observation: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  userCreated: User;

  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  userDeleted: User;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  userUpdated: User;

}
