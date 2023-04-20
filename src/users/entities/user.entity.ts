import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;
  
  @Column({ length: 120 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  isWaPhone: boolean;

  @Column({ length: 120 })
  name: string;

  @Column()
  enable: boolean;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  codeForget: string;

  @Column({ length: 120, nullable: true  })
  emailVerifiedAt: string;

  @Column({ default: 2 }) // 1 - ativo, 2 - pré cadastro, 3 - inativo
  status: number;

  @Column({ default: 'user' })
  accessLevel: string;

  @Column({ nullable: true })
  observation: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
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

