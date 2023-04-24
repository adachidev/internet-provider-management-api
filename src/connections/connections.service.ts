import { Injectable } from '@nestjs/common';
import { Connection } from './entities/connection.entity';
import { ConnectionsDto } from './dto/connection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Box } from 'src/box/entities/box.entity';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from 'src/plans/entities/plan.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private repository: Repository<Connection>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Box) private boxRepository: Repository<Box>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  removeAccents(name: string) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  async create(userId: any, dto: ConnectionsDto) {
    const boxIsExists = await this.repository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.box', 'b', 'b.id = :boxId', { boxId: dto.boxId })
      .where('c.port = :port', { port: dto.port})
      .getMany()

    if (!!boxIsExists.length) return 'PORT_IN_USE';

    // if (dto.port > box?.capacity)
    //   return 'PORT_NOT_EXISTS';

    // if (countUse.length > countPort?.capacity) return 'CAPACITY_SATURATION';

    const client = await this.clientRepository.findOne({ where: { id: dto.clientId } })
    if (!client) return 'USER_NOT_EXISTS';

    let username = !!dto.username ? dto.username : `${client.firstName.trim()}${client.lastName.trim()}`;
    username = this.removeAccents(username.toLowerCase())
    
    let password = !!dto.password ? dto.password : String(client.phone).trim()

    const connection = plainToClass(Connection, {});
    connection.id = uuidv4()
    connection.type = dto.type
    connection.client = client
    connection.observation = dto.observation
    connection.username = username
    connection.password = password
    connection.port = dto.port
    connection.signal = !!dto.signal ? Number(dto.signal) : null
    connection.latitude = !!dto.latitude ? dto.latitude : null
    connection.longitude = !!dto.longitude ? dto.longitude : null
    connection.ipV4Address = !!dto.ipV4Address ? dto.ipV4Address : null
    connection.ipV4AddressFixed = !!dto.ipV4Address
    connection.ipV6Address = !!dto.ipV6Address ? dto.ipV6Address : null
    connection.ipV6AddressFixed = !!dto.ipV6Address
    connection.createdAt = new Date();
    connection.box = plainToClass(Box, await this.boxRepository.findOne({ where: { id: dto.boxId }}));
    connection.plan = plainToClass(Plan, await this.planRepository.findOne({ where: { id: dto.planId }}));
    connection.userCreated = plainToClass(User, await this.findOne(userId));

    return await this.repository.save(connection);
  }

  async findAll() {
    return this.repository.find({
      where: {
        deletedAt: IsNull()
      },
      relations: ['client','box','plan'],
    });
  }

  async findByClient(client: string) {
    return this.repository.find({
      where: {
        client: {
          id: client
        }
      },
      relations: ['client','box','box.olt','box.olt.bras','plan']
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findUserName(username: string) {
    return this.repository.findOne({ where: { username } });
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

  async freePortById(id: string) {
    
    const box = await this.boxRepository
      .createQueryBuilder('box')
      .innerJoinAndSelect('box.olt', 'olt')
      .innerJoinAndSelect('olt.bras', 'bras')
      .leftJoinAndSelect('box.connection','c','c.box.id = box.id')
      .where('box.deletedAt is null AND box.id = :id', { id })
      .getOne()

    const usedPorts = []/*!!box?.connection ? box?.connection?.map( el => {
        return el.port
      })
    : []/*/

    const unusedPorts = Array.from({length: box.capacity}, (_, i) => i + 1)
      .filter(port => !usedPorts.includes(port));

    return unusedPorts.map( el => {
      return {
        id: el,
        name: `Porta ${el}`,
      }
    })
  }

}
