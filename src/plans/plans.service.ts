import { Injectable } from '@nestjs/common';
import { PlanDto } from './dto/plan.dto';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private repository: Repository<Plan>,
  ) {}

  async create(userId: any, dto: PlanDto) {
    const plan = plainToClass(Plan, dto);
    plan.id = uuidv4();
    plan.value = parseFloat(String(dto.value));
    plan.createdAt = new Date();
    // plan.userCreated = plainToClass(User, await this.findOne(userId));
    const result = await this.repository.save(plan);
    return result
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(userId: any, id: string, dto: PlanDto) {
    const plan = plainToClass(Plan, dto);
    plan.id = id;
    plan.updatedAt = new Date();
    // plan.userUpdated = plainToClass(User, await this.findOne(userId));
    return this.repository.save(plan);
  }

  async remove(userId: any, id: string) {
    const plan = await this.repository.findOne({ where: { id } });
    if (plan.deletedAt) return null;
    plan.deletedAt = new Date();
    plan.userDeleted = plainToClass(User, await this.findOne(userId));
    return this.repository.save(plan);
  }
}
