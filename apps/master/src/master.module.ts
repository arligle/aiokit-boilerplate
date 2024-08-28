import { Module } from '@nestjs/common';

import { MasterController } from './master/master.controller';
import { MasterService } from './master/master.service';

@Module({
  imports: [],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
