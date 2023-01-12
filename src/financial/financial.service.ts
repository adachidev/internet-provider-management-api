import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { HttpService } from '@nestjs/axios';

dotenv.config();

@Injectable()
export class FinancialService {
  constructor(private readonly httpService: HttpService) {}

  async credentials(): Promise<any> {
    const endpoint = process.env.GERNET_API;

    const credentials = Buffer.from(
      `${process.env.GERNET_CLIENT_ID}: ${process.env.GERNET_CLIENT_SECRET}`,
    ).toString('base64');

    return this.httpService.post(
      `${endpoint}/oauth/token`,
      { grant_type: 'client_credentials' },
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      },
    );
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
