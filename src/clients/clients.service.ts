import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Movement,
  MovementDocument,
} from 'src/movements/entities/movement.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(userId: any, createClientDto: CreateClientDto) {
    const isExists = await this.clientModel.findOne({
      clientId: createClientDto.clientId,
    });
    if (isExists) return 'USER_EXISTS';

    const client = new this.clientModel(createClientDto);
    const movement = new this.movementModel();
    client.createdAt = new Date();
    client.userCreatedId = userId;
    client.updatedAt = new Date();
    client.userUpdatedId = userId;
    client.enable = true;
    client.connected = false;
    const firstName = client.firstName; //.toLowerCase().replace(/^\s+|\s+$/gm, '');
    const lastName = client.lastName; //.toLowerCase().replace(/^\s+|\s+$/gm, '');
    client.username = `${firstName}.${lastName}`;
    client.password = client.phone1; //.replace(/^\s+|\s+$/gm, '');
    console.log('clients create client]', client);
    const result = await client.save();
    console.log('clients create result]', result);
    movement.clientId = result._id;
    movement.newPlanId = result.plan;
    movement.reason = 'Cadastro de cliente';
    movement.createdAt = new Date();
    movement.userCreatedId = userId;
    await movement.save();

    return result;
  }

  async findAll() {
    return this.clientModel.find().populate('plan');
  }

  async findOne(id: string) {
    return this.clientModel.findById(id).populate('plan');
  }

  async findUserName(username: string) {
    return this.clientModel
      .findOne({
        username,
      })
      .populate('plan');
  }

  async findPhone(phone: string) {
    let resPhone = await this.clientModel
      .findOne({
        phone1: phone,
      })
      .populate('plan');

    if (!resPhone || !resPhone.isWaPhone1 || !resPhone.isAdmPhone1) {
      resPhone = await this.clientModel
        .findOne({
          phone2: phone,
        })
        .populate('plan');
      if (!resPhone || !resPhone.isWaPhone2 || !resPhone.isAdmPhone2)
        return 'USER_NOT_FOUND';
    }
    return resPhone;
  }

  async update(userId: any, id: string, updateClientDto: UpdateClientDto) {
    updateClientDto.updatedAt = new Date();
    updateClientDto.userUpdatedId = userId;

    if (updateClientDto.firstName && updateClientDto.lastName) {
      const firstName = updateClientDto.firstName
        .toLowerCase()
        .replace(/^\s+|\s+$/gm, '');
      const lastName = updateClientDto.lastName
        .toLowerCase()
        .replace(/^\s+|\s+$/gm, '');
      updateClientDto.username = `${firstName}.${lastName}`;
    }

    if (updateClientDto.phone1)
      updateClientDto.password = updateClientDto.phone1.replace(
        /^\s+|\s+$/gm,
        '',
      );

    const res = await this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });

    if (!res) return 'CLIENT_NOT_FOUND';
    return res;
  }

  async remove(userId: any, id: any) {
    const client = await this.clientModel.findById(id);
    client.enable = false;
    client.deletedAt = new Date();
    client.userDeletedId = userId;
    const result = await this.clientModel.findByIdAndUpdate(id, client, {
      new: true,
    });

    const movement = new this.movementModel();
    movement.clientId = id;
    movement.reason = 'Exclusão de cliente';
    movement.createdAt = new Date();
    movement.userCreatedId = userId;
    await movement.save();

    return result;
  }
}
