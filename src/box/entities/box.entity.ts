import { Connection } from "src/connections/entities/connection.entity";
import { Olt } from "src/olt/entities/olt.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'box' })
export class Box {

  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 36 })
  code: string;

  @OneToMany(() => Connection, (connection) => connection.box)
  connection: Connection

  @Column({ length: 36 })
  latitude: string;

  @Column({ length: 36 })
  longitude: string;

  @Column({ length: 250 })
  address: string;

  @Column({ length: 100, default: 'CTO' })
  type: string;

  @Column({ default: 16 })
  capacity: number;

  @Column()
  signal: number;

  @ManyToOne(() => Olt, (olt) => olt.id, { nullable: true })
  olt: Olt;

  @Column()
  oltId: string;

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
