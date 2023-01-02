import axios from 'axios';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const instance = axios.create({
  baseURL: process.env.WA_URL,
  timeout: 3000,
  headers: {
    'X-Api-Key': process.env.WA_PASS,
    'Content-Type': 'application/json',
  },
});

@Injectable()
export class WaService {
  constructor() {}

  async sendText(phone: string, message: string, token: string) {
    const phoneNumber = phone.replace(/\D/gim, '');

    if (token != process.env.WA_PASS) return 'TOKEN_ERROR';

    const response = await instance.post(
      '/api/sendText',
      JSON.stringify({
        chatId: `${phoneNumber}@c.us`,
        text: message,
        session: 'default',
      }),
    );

    return JSON.parse(JSON.stringify(response.data));
  }
}
