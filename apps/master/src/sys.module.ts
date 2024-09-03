import { Module } from '@nestjs/common';
import { SysController } from './sys/sys.controller';
import { SysService } from './sys/sys.service';
import { setupLoggerModule } from '@aiokit/logger';
import { setupYamlBaseConfigModule } from '@aiokit/config';
import path from 'path';
import RootConfig from './config/root.config';
import { Logger } from 'nestjs-pino';
import { setupI18NModule } from '@aiokit/i18n';
import { setupClsModule } from '@aiokit/async-storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './database/entities';
import { setupTypeormModule } from '@aiokit/typeorm';

@Module({
  imports: [
    setupLoggerModule(),
    // TODO: 注意环境变量的配置文件的路径获取，__dirname是构建后dist目录下的main.js文件所在的目录
    setupYamlBaseConfigModule(
      path.join(__dirname, '../../../', 'apps/master/src'),
      RootConfig
    ),
    setupI18NModule(path.join(__dirname, '../../../')),
    setupClsModule(),
    setupTypeormModule(),
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  controllers: [SysController],
  providers: [
    SysService,
    Logger,
  ],
})
export class SysModule { }

