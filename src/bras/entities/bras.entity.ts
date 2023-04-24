import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'bras' })
export class Bras {

  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 36 })
  code: string;

  @Column({ length: 120 })
  vendor: string;

  @Column({ length: 250 })
  model: string;

  @Column({ length: 100 })
  status: string;

  @Column({ default: 16 })
  interfaces: number;

  @Column()
  ipv4manager: string;

  @Column()
  macmanager: string;

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
