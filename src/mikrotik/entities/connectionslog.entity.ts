import { Connection } from 'src/connections/entities/connection.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'connectionslog' })
export class ConnectionsLog {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;
  
  @Column({ length: 100 })
  description: string;

  @Column({ length: 100 })
  interface: string;

  @Column({ length: 100 })
  username: string;

  @Column({ nullable: true })
  connectDate: Date;

  @Column()
  disconnectionDate: Date;

  @ManyToOne(() => Connection, (connection) => connection.id)
  connection: Connection;

  @Column({ length: 36, nullable: true })
  connectionId: string;

  @Column({ length: 16, nullable: true })
  ipv4: string;

  @Column({ length: 50, nullable: true })
  ipv6lan: string;

  @Column({ length: 50, nullable: true })
  ipv6wan: string;

  @Column({ length: 50, nullable: true  })
  mac: string;

  @Column({ length: 36 })
  brasId: string;

  @Column({ length: 36, nullable: true  })
  oltId: string;

  @Column({ length: 250, nullable: true  })
  observation: string;

  @Column()
  createdAt: Date;

}

