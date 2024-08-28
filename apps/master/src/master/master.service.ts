import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterService {
  getData(): { message: string } {
    return ({ message: 'Hello Master API' });
  }
}
