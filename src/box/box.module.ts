import { BoxController } from './box.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from './entities/box.entity';
import { BoxService } from './box.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
