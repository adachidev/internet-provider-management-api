import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Box, BoxDocument } from 'src/box/entities/box.entity';
import { CreateConnectionsDto } from './dto/create-connection.dto';
import { Connection, ConnectionDocument } from './entities/connection.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectModel(Connection.name)
    private connectionModel: Model<ConnectionDocument>,
    @InjectModel(Box.name) private boxModel: Model<BoxDocument>,
  ) {}

  async create(userId: any, createConnectionsDto: CreateConnectionsDto) {
    const isExists = await this.connectionModel
      .findOne()
      .where('box')
      .equals(createConnectionsDto.box)
      .where('port')
      .equals(createConnectionsDto.port);

    if (isExists) return 'CONNECTION_EXISTS';

    const countPort = await this.boxModel.findById(createConnectionsDto.box);

    const countUse = await this.connectionModel
      .find()
      .where('box')
      .equals(createConnectionsDto.box);

    if (createConnectionsDto.port > countPort?.capacity)
      return 'PORT_NOT_EXISTS';

    if (countUse.length > countPort?.capacity) return 'CAPACITY_SATURATION';

    const connection = new this.connectionModel(createConnectionsDto);
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
}
