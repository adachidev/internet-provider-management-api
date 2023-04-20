import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { OltController } from './olt.controller';
import { OltService } from './olt.service';
import { Olt } from './entities/olt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Olt, User,
    ]),
  ],
  controllers: [OltController],
  providers: [OltService],
})
export class BoxModule {}
