import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WaController } from './wa.controller';
import { WaService } from './wa.service';
import { Agent } from 'https';
import { resolve } from 'path';
import { readFileSync } from 'fs';

@Module({
  imports: [HttpModule],
  controllers: [WaController],
  providers: [WaService],
})
export class WaModule {}
