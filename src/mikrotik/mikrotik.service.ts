import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConnectionsLog } from './entities/connectionslog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

@Injectable()
export class MikrotikService {
  constructor(
    @InjectRepository(ConnectionsLog) private repository: Repository<ConnectionsLog>,
  ) {}

  async create(
    inter: string,
    action: string,
    user: string,
    mac: string,
    nas: string,
    service: string,
    ipv4: string,
    remoteipv6: string,
    dhcpv6pd: string,
    dto: any
  ) {
    
    console.log({action, user, mac, nas, service, ipv4, remoteipv6, dhcpv6pd, dto})
    const connectionsLog = plainToClass(ConnectionsLog, dto);
    connectionsLog.id = uuidv4();
    connectionsLog.description = action === 'u' ? 'Cliente Conectado' : action === 'd' ? 'Cliente Desconectado' : 'Action incorreto';
    connectionsLog.interface = action === 'u' ? inter : '';
    connectionsLog.username = user;
    connectionsLog.userId = '';
    connectionsLog.ipv4 = ipv4;
    connectionsLog.ipv6 = remoteipv6;
    connectionsLog.mac = mac;
    connectionsLog.brasId = '';
    connectionsLog.oltId = '';
    connectionsLog.observation = '';
    connectionsLog.createdAt = new Date();
    
    await this.repository.save(connectionsLog);

    return null
  }

  async findAll() {
    return this.repository.find()
  }

}
