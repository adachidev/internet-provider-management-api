import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Bras } from './entities/bras.entity';
import { BrasDto } from './dto/bras.dto';

@Injectable()
export class BrasService {
  constructor(
    @InjectRepository(Bras) private repository: Repository<Bras>,  
  ) {}

  async create(userId: any, dto: BrasDto) {
    const isExists = await this.repository.findOne({
      where: {
        description: dto.description
      }
    });

    if (isExists) return 'DESCRIPTION_EXISTS';

    const bras = plainToClass(Bras, dto);
    bras.id = uuidv4();
    bras.createdAt = new Date();
    bras.userCreated = plainToClass(User, await this.findOne(userId));

    return await this.repository.save(bras);
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
