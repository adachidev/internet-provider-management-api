import * as dotenv from 'dotenv';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import {Injectable, Logger } from '@nestjs/common';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import { Agent } from 'https';
import { resolve } from 'path';

dotenv.config();

@Injectable()
export class GerNetService {
  private readonly logger = new Logger(GerNetService.name);
  
  constructor(private readonly httpService: HttpService) {}

  public _api_url = process.env.GERNET_API
  public _api_id = process.env.GERNET_CLIENT_ID
  public _api_secret = process.env.GERNET_CLIENT_SECRET
  public token = null

  async credentials(): Promise<any> {
    const credentials = Buffer.from(
      `${this._api_id}:${this._api_secret}`,
    ).toString('base64');

    const httpsAgent = new Agent({
      pfx: readFileSync(
        resolve(__dirname, `../../cert/${process.env.GERNET_CERT}`),
      ),
      passphrase: '',
    });

    const url = `${this._api_url}/oauth/token`;
    const data = { grant_type: 'client_credentials' };
    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      httpsAgent,
    };

    return await lastValueFrom(
      this.httpService.post(url, data, config),
    );
  }

  async create() {
    const res = await this.credentials();
    console.log({res})
    return res
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)//EVERY_DAY_AT_MIDNIGHT
  // async searchOverdue() {
  //   this.logger.debug(`${moment().format()}:Init Schedule Financial`);
  //   console.log('rodando')
  // }

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
