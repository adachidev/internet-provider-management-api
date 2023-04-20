import { Injectable } from '@nestjs/common';
import { Box } from './entities/box.entity';
import { BoxDto } from './dto/box.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BoxService {
  constructor(
    @InjectRepository(Box) private repository: Repository<Box>,  
  ) {}

  async create(userId: any, dto: BoxDto) {
    const isExists = await this.repository.findOne({
      where: {
        description: dto.description
      }
    });

    if (isExists) return 'DESCRIPTION_EXISTS';

    const box = plainToClass(Box, dto);
    box.id = uuidv4();
    box.createdAt = new Date();
    box.userCreated = plainToClass(User, await this.findOne(userId));

    return await this.repository.save(box);
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
