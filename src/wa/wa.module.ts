import { Module } from '@nestjs/common';
import { WaController } from './wa.controller';
import { WaService } from './wa.service';

@Module({
  imports: [],
  controllers: [WaController],
  providers: [WaService],
  exports: [WaService],
})
export class WaModule {}
