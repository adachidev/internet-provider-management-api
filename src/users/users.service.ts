import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async create(userId: any, dto: UserDto): Promise<User> {
    
    const isExists = await this.getByEmail(dto.email);
    if (isExists) throw new NotFoundException('User exists');

    const user = plainToClass(User, dto);
    user.id = uuidv4();
    user.enable = true;
    user.createdAt = new Date();
    user.userCreated = plainToClass(User, await this.getById(userId));
    user.updatedAt = new Date();
    user.userUpdated = plainToClass(User, await this.getById(userId));
    user.status = 2;
    user.password = await bcrypt.hash(dto.password, 10);
    
    const result = await this.repository.save(user);
    return result;
  }

  async findAll() {
    return await this.repository.find();
  }

  async getById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async getByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async update(userId: any, id: string ,dto: UserDto) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) return 'USER_NOT_FOUND'
    // if (entity.email != dto.email)
    //   this.saveLog(userId, entity.id, entity.email, dto.email);

    // if (!entity.password && entity.status === 3)
    //   this.sendMailPreCadastro(entity);

    const user = plainToClass(User, dto);
    user.updatedAt = new Date();
    user.userUpdated = plainToClass(User, await this.getById(userId));
    
    if (!!user.password)
      user.password = await bcrypt.hash(user.password, 10);
    
    const result = await this.repository.save(user);

    if (!result) return 'USER_NOT_FOUND';
    return result;
  }

  async remove(userId: any, id: any) {
    const user = await this.repository.findOne(id);
    if (!user) return 'USER_NOT_FOUND';

    user.deletedAt = new Date();
    user.userDeleted = plainToClass(User, await this.getById(userId));

    const result = await this.repository.save(user);
    return result;
  }
}
