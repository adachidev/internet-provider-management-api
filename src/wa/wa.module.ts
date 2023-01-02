import { Module } from '@nestjs/common';
import { WaController } from './wa.controller';
import { WaService } from './wa.service';

@Module({
  imports: [],
  controllers: [WaController],
  providers: [WaService],
})
export class WaModule {}
