import { Connection } from "src/connections/entities/connection.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'client' })
export class Client {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  isWaPhone: boolean;

  @Column({ default: true }) // para integração com whatsapp
  isAdmPhone: boolean;

  @Column()
  phone2: string;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  midName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true }) // 1 - pré cadastro, 2 - ativo, 3 - inativo
  status: number;

  @Column() // CPF ou CNPJ
  registerNumber: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column() // Rua ....
  address: string;

  @Column() // 1° Andar ou AP 135
  addressComplement: string;

  @Column() // Ponto de refer~encia
  addressReference: string;

  @Column() // jm - Condominio JM
  addressRegion: string;

  @Column() // Número
  addressNumber: string;

  @Column() // Bairro
  addressDistrito: string;

  @Column() // Cidade
  addressCity: string;

  @Column() // Estado
  addressState: string;

  @Column()
  addressCep: string;

  @Column() // Latitude
  latLocation: string;

  @Column() // Longitude
  lonLocation: string;

  @Column({ type: Date }) // Data de aniversário
  birthDate: Date;

  @OneToMany(() => Connection, (connection) => connection.id, { nullable: true })
  connections: Connection[];

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
