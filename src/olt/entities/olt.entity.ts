import { Bras } from "src/bras/entities/bras.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'olt' })
export class Olt {

  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column({ length: 120 })
  description: string;

  @Column({ length: 36 })
  code: string;

  @Column({ length: 120 })
  vendor: string;

  @Column({ length: 120 })
  model: string;

  @Column({ length: 120, default: '1' })
  status: string;

  @Column({ default: 8 })
  interfaces: number;

  @Column({ default: 16 })
  ipv4manager: string;

  @Column({ default: 18 })
  macmanager: string;

  @Column({ default: 36 })
  brasId: string;

  @ManyToOne(() => Bras, (bras) => bras.id, { nullable: true })
  bras: Bras;

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
