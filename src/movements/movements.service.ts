import { Injectable, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Movement, MovementDocument } from './entities/movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
  ) {}

  create(createMovementDto: CreateMovementDto) {
    const movement = new this.movementModel(createMovementDto);
    movement.createdAt = new Date();
    // movement.userCreatedId =
    return movement.save();
  }

  async findAll() {
    return await this.movementModel.find();
  }

  async findOne(id: any) {
    return this.movementModel.findById(id);
  }

  remove(id: any) {
    return this.movementModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
