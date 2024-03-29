import { BoxController } from './box.controller';
import { Module } from '@nestjs/common';
import { Box } from './entities/box.entity';
import { BoxService } from './box.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Box, User,
    ]),
  ],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
