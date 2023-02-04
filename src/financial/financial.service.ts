import * as dotenv from 'dotenv';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import { Agent } from 'https';
import { resolve } from 'path';

dotenv.config();

@Injectable()
export class FinancialService {
  constructor(private readonly httpService: HttpService) {}

  async credentials(): Promise<any> {
    const credentials = Buffer.from(
      `${process.env.GERNET_CLIENT_ID}: ${process.env.GERNET_CLIENT_SECRET}`,
    ).toString('base64');

    const httpsAgent = new Agent({
      pfx: readFileSync(
        resolve(__dirname, `../../cert/${process.env.GERNET_CERT}`),
      ),
      passphrase: '',
    });

    const url = `${process.env.GERNET_API}/oauth/token`;
    const data = { grant_type: 'client_credentials' };
    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      httpsAgent,
    };

    const response = await lastValueFrom(
      this.httpService.post(url, data, config),
    );
    console.log(response.data);
    // OK
    return response.status === HttpStatus.ACCEPTED;
  }

  create(createFinancialDto: CreateFinancialDto) {
    return this.credentials();
  }

  findAll() {
    // process.env.MONGO_USER
    return `This action returns all financial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financial`;
  }

  update(id: number, updateFinancialDto: UpdateFinancialDto) {
    return `This action updates a #${id} financial`;
  }

  remove(id: number) {
    return `This action removes a #${id} financial`;
  }
}
