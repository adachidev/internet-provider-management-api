import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userId: any, createUserDto: CreateUserDto): Promise<User> {
    const isExists = await this.getByEmail(createUserDto.email);
    if (isExists) throw new NotFoundException('User exists');
    const user = new this.userModel(createUserDto);
    user.enable = true;
    user.createdAt = new Date();
    user.userCreatedId = userId;
    user.updatedAt = new Date();
    user.userUpdatedId = userId;
    user.status = 3;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    const result = await user.save();
    return result;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async getById(id: string) {
    return await this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(userId: any, id: any, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date();
    updateUserDto.userUpdatedId = userId;
    if (!!updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!result) return 'USER_NOT_FOUND';
    return result;
  }

  async remove(userId: any, id: any) {
    const user = new this.userModel();

    user.enable = false;
    user.deletedAt = new Date();
    user.userDeletedId = userId;
    const result = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (!result) return 'USER_NOT_FOUND';
    return result;
  }
}
