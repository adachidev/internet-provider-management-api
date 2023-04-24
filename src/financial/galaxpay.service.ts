import * as dotenv from 'dotenv';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class GalaxPayService {
  constructor(private readonly httpService: HttpService) {}
  
  public _api_url = process.env.GALAXPAY_API
  public _api_id = process.env.GALAXPAY_ID
  public _api_hash = process.env.GALAXPAY_HASH
  public token = null

  async getToken() {
    const url = `${this._api_url}/token`;

    const credentials = Buffer.from(`${this._api_id}:${this._api_hash}`).toString('base64');

    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      grant_type: 'authorization_code',
      scope: `customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read`
    };

    const res = await lastValueFrom(
      this.httpService.post(url, body, config),
    );

    if (res?.status === 200) this.token = res?.data?.access_token

    return this.token
  }

  async requestGet(patch: string, query: string) {
    const token = await this.getToken()
console.log({token})
    const url = `${this._api_url}${patch}?${query}`;

    const data = {
      // grant_type: `${token}`,
      // scope: `customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read`
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return await lastValueFrom(
      this.httpService.post(url, {}, config),
    );
  }

  async create(createFinancialDto: CreateFinancialDto) {
    const res = await this.requestGet('/customers','startAt=0&limit=100&order=createdAt.asc')
    console.log({res})
    return res
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
