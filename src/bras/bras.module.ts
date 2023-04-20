import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Bras } from './entities/bras.entity';
import { BrasController } from './bras.controller';
import { BrasService } from './bras.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bras, User,
    ]),
  ],
  controllers: [BrasController],
  providers: [BrasService],
})
export class BoxModule {}
