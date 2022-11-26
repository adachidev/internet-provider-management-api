import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}

  create(createPlanDto: CreatePlanDto) {
    const plan = new this.planModel(createPlanDto);
    return plan.save();
  }

  findAll() {
    return this.planModel.find();
  }

  findOne(id: string) {
    return this.planModel.findById(id);
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.planModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatePlanDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.planModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
