import { Injectable } from '@nestjs/common';

@Injectable()
export class SysService {
  getData(): { message: string } {
    return ({ message: 'Hello Master API' });
  }
}
