import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoxDto } from './dto/create-box.dto';
import { Box, BoxDocument } from './entities/box.entity';

@Injectable()
export class BoxService {
  constructor(@InjectModel(Box.name) private boxModel: Model<BoxDocument>) {}

  async create(userId: any, createBoxDto: CreateBoxDto) {
    const isExists = await this.boxModel.findOne({
      code: createBoxDto.code,
    });

    if (isExists) return 'CODE_EXISTS';

    const box = new this.boxModel(createBoxDto);
    box.createdAt = new Date();
    box.userCreatedId = userId;
    box.updatedAt = new Date();
    box.userUpdatedId = userId;

    return await box.save();
  }

  async findAll() {
    return this.boxModel.find();
  }

  async findOne(id: string) {
    return this.boxModel.findById(id);
  }
}
