import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Box, BoxDocument } from 'src/box/entities/box.entity';
import { CreateConnectionsDto } from './dto/create-connection.dto';
import { Connection, ConnectionDocument } from './entities/connection.entity';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectModel(Connection.name)
    private connectionModel: Model<ConnectionDocument>,
    @InjectModel(Box.name) private boxModel: Model<BoxDocument>,
    private readonly clientsService: ClientsService,
  ) {}

  removeAccents(name: string) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  async create(userId: any, createConnectionsDto: CreateConnectionsDto) {
    const isExists = await this.connectionModel
      .findOne()
      .where('box')
      .equals(createConnectionsDto.box)
      .where('port')
      .equals(createConnectionsDto.port);

    if (!!isExists && !!createConnectionsDto.box && !!createConnectionsDto.port) return 'CONNECTION_EXISTS';

    const countPort = await this.boxModel.findById(createConnectionsDto.box);

    const countUse = await this.connectionModel
      .find()
      .where('box')
      .equals(createConnectionsDto.box);

    if (createConnectionsDto.port > countPort?.capacity)
      return 'PORT_NOT_EXISTS';

    if (countUse.length > countPort?.capacity) return 'CAPACITY_SATURATION';

    const client = await this.clientsService.findOne(createConnectionsDto.client)
    if (!client) return 'USER_NOT_EXISTS';

    let username = `${client.firstName.trim()}${client.lastName.trim()}`;
    username = this.removeAccents(username.toLowerCase())
    let password = String(client.phone).trim()
    const connection = new this.connectionModel(createConnectionsDto);
    connection.client = client
    connection.username = username
    connection.password = password
    connection.createdAt = new Date();
    connection.userCreatedId = userId;
    connection.updatedAt = new Date();
    connection.userUpdatedId = userId;

    return await connection.save();
  }

  async findAll() {
    return this.connectionModel.find();
  }

  async findOne(id: string) {
    return this.connectionModel.findById(id);
  }

  async findUserName(username: string) {
    return this.connectionModel.findOne({ username }).populate('plan');
  }
}
