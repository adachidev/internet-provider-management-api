import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConnectionsLog } from './entities/connectionslog.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'src/clients/entities/client.entity';
import { Connection } from 'src/connections/entities/connection.entity';
import * as moment from 'moment';

dotenv.config();

@Injectable()
export class MikrotikService {
  private readonly logger = new Logger(MikrotikService.name);
  constructor(
    @InjectRepository(ConnectionsLog) private repository: Repository<ConnectionsLog>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Connection) private connectionRepository: Repository<Connection>,
  ) {}

  async create(
    dto: any
  ) {
    
    const {inter, action, user, mac, nas, service, ipv4, remoteipv6, dhcpv6pd } = dto

    if (!user) return false

    const now = new Date();
    
    if (action === 'd') {
      const last = await this.repository.findOne({
        where: {
          username: user,
          disconnectionDate: IsNull()
        }
      })

      if (!last) return null
      
      const connectionsLog = plainToClass(ConnectionsLog, last);
      connectionsLog.disconnectionDate = new Date(now.getTime())
      await this.repository.save(connectionsLog);
      this.logger.debug(`client ${user} disconnected`);
      return null
    }

    if (action === 'c') {
      const connectionData = await this.connectionRepository.findOne({
        where: {
          username: user
        },
        relations: ['client','box','box.olt','box.olt.bras']
      })

      const connectionsLog = plainToClass(ConnectionsLog, dto);
      connectionsLog.id = uuidv4();
      connectionsLog.description = '';
      connectionsLog.interface = !!inter ? inter : 'PPPOE';
      connectionsLog.username = !!user ? user : '';
      connectionsLog.connection = plainToClass(Connection, await this.connectionRepository.findOne({ where: { username: user }}));
      connectionsLog.ipv4 = !!ipv4 ? ipv4 : '';
      connectionsLog.ipv6lan = !!dhcpv6pd ? dhcpv6pd : '';
      connectionsLog.ipv6wan = !!remoteipv6 ? remoteipv6 : '';
      connectionsLog.mac = !!mac ? mac : '';
      connectionsLog.brasId = !!connectionData ? connectionData?.box?.olt?.bras?.id : '';
      connectionsLog.oltId = !!connectionData ? connectionData?.box?.olt?.id : '';
      connectionsLog.observation = '';
      connectionsLog.createdAt = new Date(now.getTime())
      connectionsLog.connectDate = new Date(now.getTime() - 60000)
      connectionsLog.disconnectionDate = null;
      
      await this.repository.save(connectionsLog);
      this.logger.debug(`client ${user} connected`);
    }

    return null
  }

  async findAll() {
    return this.repository.find({ relations: ['connection','connection.client','connection.box','connection.box.olt','connection.box.olt.bras']})
  }

}
