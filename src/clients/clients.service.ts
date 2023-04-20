import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from './dto/client.dto';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
    // @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  async create(userId: any, dto: ClientDto) {
    const isExists = await this.repository.findOne({
      where: { registerNumber: dto.registerNumber },
    });
    if (isExists) return 'USER_EXISTS';

    const client = plainToClass(Client, dto);
    client.id = uuidv4();
    client.createdAt = new Date();
    client.username = client.email.toLocaleLowerCase()
    client.password = client.registerNumber
    client.userCreated = plainToClass(User, await this.findOne(userId));
    client.status = 2;// pre cadastro
    const result = await this.repository.save(client);

    // const movement = new this.movementModel();
    // movement.clientId = result._id;
    // movement.reason = 'Cadastro de cliente';
    // movement.createdAt = new Date();
    // movement.userCreatedId = userId;
    // await movement.save();

    return result;
  }

  async findAll() {
    return this.repository.find({ where: { deletedAt: IsNull() } })
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id }})
  }

  async findEmail(email: string) {
    return this.repository.findOne({ where: { email } })
  }

  async findPhone(phone: string) {
    let resPhone = await this.repository.findOne({ where: { phone } })

    if (!resPhone || !resPhone.isWaPhone || !resPhone.isAdmPhone) {
      resPhone = await this.repository.findOne({ where: { phone } })
    }
    return resPhone;
  }

  async update(userId: any, id: string, dto: ClientDto) {
    const isExists = await this.repository.findOne({ where: { id }})
    if (!isExists) return 'USER_NOT_FOUND'

    const client = plainToClass(Client, dto);
    client.updatedAt = new Date();
    client.userUpdated = plainToClass(User, await this.findOne(userId));
    client.id = id

    // if (client.firstName && client.lastName) {
    //   const firstName = client.firstName
    //     .toLowerCase()
    //     .replace(/^\s+|\s+$/gm, '');
    //   const lastName = client.lastName
    //     .toLowerCase()
    //     .replace(/^\s+|\s+$/gm, '');
    //   client.username = `${firstName}.${lastName}`;
    // }

    // if (client.phone)
    //   client.password = client.phone.replace(
    //     /^\s+|\s+$/gm,
    //     '',
    //   );

    const res = await this.repository.save(client);

    if (!res) return 'CLIENT_NOT_FOUND';
    return res;
  }

  async remove(userId: any, id: any) {
    const client = await this.repository.findOne({ where: { id } });
    if (client.deletedAt) return null
    client.status = 3;
    client.deletedAt = new Date();
    client.userDeleted = plainToClass(User, await this.findOne(userId));
    const result = await this.repository.save(client);

    // const movement = new this.movementModel();
    // movement.clientId = id;
    // movement.reason = 'Exclusão de cliente';
    // movement.createdAt = new Date();
    // movement.userCreatedId = userId;
    // await movement.save();

    return result;
  }
}
