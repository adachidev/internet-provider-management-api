import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Olt } from './entities/olt.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OltDto } from './dto/olt.dto';

@Injectable()
export class OltService {
  constructor(
    @InjectRepository(Olt) private repository: Repository<Olt>,  
  ) {}

  async create(userId: any, dto: OltDto) {
    const isExists = await this.repository.findOne({
      where: {
        description: dto.description
      }
    });

    if (isExists) return 'DESCRIPTION_EXISTS';

    const olt = plainToClass(Olt, dto);
    olt.id = uuidv4();
    olt.createdAt = new Date();
    olt.userCreated = plainToClass(User, await this.findOne(userId));

    return await this.repository.save(olt);
  }

  async findAll() {
    return this.repository.find({
      where: {
        deletedAt: IsNull()
      }
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({
      where: {
        id
      }
    });
  }
}
