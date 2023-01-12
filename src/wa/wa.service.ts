import { ForbiddenException, Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { catchError, lastValueFrom, map, tap } from 'rxjs';

dotenv.config();

// const instance = axios.create({
//   baseURL: process.env.WA_URL,
//   timeout: 10000,
//   headers: {
//     accept: 'application/json',
//     'X-Api-Key': process.env.WA_PASS,
//     'Content-Type': 'application/json',
//   },
// });

@Injectable()
export class WaService {
  constructor(private readonly httpService: HttpService) {}

  async sendText(phone: string, message: string, token: string) {
    let phoneNumber = phone.replace(/\D/gim, '');

    if (phoneNumber.length < 8 || phoneNumber.length > 13) return 'PHONE_ERROR';

    phoneNumber =
      phoneNumber.length === 13
        ? phoneNumber // 5571 92590635
        : phoneNumber.length === 12
        ? phoneNumber.slice(0, 4) + 9 + phoneNumber.slice(4, 12)
        : phoneNumber.length === 11
        ? 55 + phoneNumber
        : phoneNumber.length === 10
        ? 55 + phoneNumber.slice(0, 2) + 9 + phoneNumber.slice(2, 10)
        : phoneNumber.length === 9
        ? 5571 + phoneNumber
        : phoneNumber.length === 8
        ? 55719 + phoneNumber
        : phoneNumber;

    if (token != process.env.WA_PASS) return 'TOKEN_ERROR';

    const url = `${process.env.WA_URL}/api/sendText`;
    // const request = await lastValueFrom(
    const config = {
      headers: {
        'X-Api-Key': process.env.WA_PASS,
      },
    };

    const data = {
      chatId: `${phoneNumber}@c.us`,
      text: message,
      session: 'default',
    };

    const response = await lastValueFrom(
      this.httpService.post(url, data, config),
    );

    return response.status === HttpStatus.ACCEPTED;
  }
}
