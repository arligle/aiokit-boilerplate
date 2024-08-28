import { Controller, Get } from '@nestjs/common';

import { MasterService } from './master.service';

@Controller()
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get()
  getData() {
    return this.masterService.getData();
  }
}
