import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userId: any, createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    user.createdAt = new Date();
    user.userCreatedId = userId;
    user.updatedAt = new Date();
    user.userUpdatedId = userId;
    const result = await user.save();
    return result;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: any) {
    return this.userModel.findById(id);
  }

  async update(userId: any, id: any, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date();
    updateUserDto.userUpdatedId = userId;
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
