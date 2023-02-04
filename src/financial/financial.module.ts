import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    HttpModule,
    // .register({
    //   timeout: 10000,
    //   maxRedirects: 5,
    //   httpsAgent: new Agent({
    //     pfx: readFileSync(
    //       resolve(__dirname, `../../cert/${process.env.GERNET_CERT}`),
    //     ),
    //     passphrase: '',
    //   }),
    // }
    // ),
  ],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
