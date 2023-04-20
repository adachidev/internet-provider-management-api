import { Injectable } from '@nestjs/common';
import { Connection } from './entities/connection.entity';
import { ConnectionsDto } from './dto/connection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private repository: Repository<Connection>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  removeAccents(name: string) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  async create(userId: any, dto: ConnectionsDto) {
    const box = await this.repository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.box', 'b', 'b.id = :boxId', { boxId: dto['box'].id })

    // if (!!box && box.port === dto.port) return 'CONNECTION_EXISTS';

    // if (dto.port > box?.capacity)
    //   return 'PORT_NOT_EXISTS';

    // if (countUse.length > countPort?.capacity) return 'CAPACITY_SATURATION';

    const client = await this.clientRepository.findOne({ where: { id: dto.clientId } })
    if (!client) return 'USER_NOT_EXISTS';

    let username = `${client.firstName.trim()}${client.lastName.trim()}`;
    username = this.removeAccents(username.toLowerCase())
    
    let password = String(client.phone).trim()

    const connection = plainToClass(Connection, dto);
    connection.client = client
    connection.username = username
    connection.password = password
    connection.createdAt = new Date();
    connection.userCreated = plainToClass(User, await this.findOne(userId));

    return await this.repository.save(connection);
  }

  async findAll() {
    return this.repository.find({ where: { deletedAt: IsNull() }});
  }

  async findByClient(client: string) {
    this.repository.find({ where: { client: { id: client } } });
  }

  async findOne(id: string) {
    this.repository.findOne({ where: { id } });
  }

  async findUserName(username: string) {
    this.repository.findOne({ where: { username } });
  }

  async update(userId: string, id: string, dto: ConnectionsDto) {
    const isExists = await this.repository.findOne({ where: { id }})
    if (!isExists) return 'NOT_FOUND'

    const connection = plainToClass(Connection, dto);
    connection.updatedAt = new Date();
    connection.userUpdated = plainToClass(User, await this.findOne(userId));
    connection.id = id
    const res = await this.repository.save(connection);
    return res;
  }
  
  async remove(userId: string, id: string) {
    const connection = await this.repository.findOne({ where: { id } });
    if (connection.deletedAt) return null
    
    connection.deletedAt = new Date();
    connection.userDeleted = plainToClass(User, await this.findOne(userId));
    const result = await this.repository.save(connection);

    // const movement = new this.movementModel();
    // movement.clientId = id;
    // movement.reason = 'Exclusão de cliente';
    // movement.createdAt = new Date();
    // movement.userCreatedId = userId;
    // await movement.save();

    return result;
  }

}
