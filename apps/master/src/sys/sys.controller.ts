import { Controller, Get } from '@nestjs/common';

import { SysService } from './sys.service';

@Controller()
export class SysController {
  constructor(private readonly sysService: SysService) { }

  @Get()
  getData() {
    return this.sysService.getData();
  }
}
