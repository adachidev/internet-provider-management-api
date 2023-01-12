import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { HttpModule } from '@nestjs/axios';
import { readFileSync } from 'fs';
import { Agent } from 'https';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
      httpsAgent: new Agent({
        pfx: readFileSync(
          resolve(__dirname, `../../cert/${process.env.GERNET_CERT}`),
        ),
        passphrase: '',
      }),
    }),
  ],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
