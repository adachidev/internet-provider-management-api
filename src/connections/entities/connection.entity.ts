import { Box } from "src/box/entities/box.entity";
import { Client } from "src/clients/entities/client.entity";
import { Plan } from "src/plans/entities/plan.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'connection' })
export class Connection {

  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @ManyToOne(() => Client, (client) => client.id)
  client: Client;

  @Column()
  clientId: string

  @Column({ length: 36 })
  latitude: string;

  @Column({ length: 36 })
  longitude: string;

  // @ManyToOne(() => Box, (box) => box.id)
  // box: Box;

  @Column()
  boxId: string;

  @ManyToOne(() => Plan, (plan) => plan.id)
  plan: Plan;

  @Column()
  planId: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  signal: number;

  @Column({ default: 'fttc' })
  type: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  ipV4Address: string;

  @Column({ default: false })
  ipV4AddressFixed: boolean;

  @Column({ nullable: true })
  ipV6Address: string;

  @Column({ default: false })
  ipV6AddressFixed: boolean;

  @Column({ nullable: true })
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
