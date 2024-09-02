import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import {
  buildFastifyAdapter,
  AppConfig,
  applyExpressCompatibilityRecommendations,
  setupGlobalFilters,
  setupGlobalInterceptors,
  callOrUndefinedIfException,
} from '@aiokit/bootstrap';
import { Logger } from "nestjs-pino";
// import { clusterize } from '@aiokit/utils';
import type { FastifyInstance } from "fastify/types/instance";
import { fastifyHelmet } from '@fastify/helmet';
import { I18nValidationPipe, } from '@aiokit/i18n';
import { DEFAULT_VALIDATION_OPTIONS } from '@aiokit/validation';
import { SysModule } from "./sys.module";
import { initializeTransactionalContext } from "typeorm-transactional";
import { setupSwagger, SwaggerConfig } from '@aiokit/swagger-utils';
// const { CLUSTERING } = process.env;
const bootstrap = async () => {

  // 初始化事务上下文存储驱动。需要在应用程序启动之前调用这个方法
  initializeTransactionalContext();
  const app = await NestFactory.create<NestFastifyApplication>(
    SysModule,
    buildFastifyAdapter(),
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  /*
  监听 'uncaughtException' 事件。'uncaughtException' 事件在程序中有未捕获的异常时触发。
  在程序中发生未捕获异常时，能够记录详细的错误信息
  */
  process.on(
    'uncaughtException',
    /* istanbul ignore next */(err) => {
      // Handle the error safely
      logger.error('Uncaught exception: %o', err);
    },
  );
  /*
  监听 'unhandledRejection' 事件。'unhandledRejection' 事件在程序中有未处理的 Promise 拒绝时触发。
  在程序中发生未处理的 Promise 拒绝时，能够记录详细的错误信息
  */
  process.on(
    'unhandledRejection',
    /* istanbul ignore next */(reason, promise) => {
      // Handle the error safely
      logger.error(
        'Unhandled Rejection at: Promise: %o, reason: %s',
        promise,
        reason,
      );
    },
  );
  // 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
  const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();
  applyExpressCompatibilityRecommendations(fastifyInstance);
  // 使用 fastify-helmet 中间件,会启用一组默认的增强HTTP头安全的配置
  app.register(fastifyHelmet, {});
  // 设置跨域配置
  app.enableCors(new AppConfig().cors);
  // 为了在应用程序关闭时优雅地关闭所有连接，我们需要启用关闭挂钩
  app.enableShutdownHooks();

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalPipes(new I18nValidationPipe(DEFAULT_VALIDATION_OPTIONS));

  // // so first global one and then narrow
  setupGlobalFilters(app, httpAdapterHost);
  setupGlobalInterceptors(app);
  // TODO: 其他的初始化配置操作
  // initialize(app);

  // const appPrefix = 'prefix';
  const swaggerConfig = callOrUndefinedIfException(() =>
    app.get(SwaggerConfig),
  );


  const appConfig = app.get(AppConfig);
  if (swaggerConfig instanceof SwaggerConfig) {
    const swaggerSetup = setupSwagger(swaggerConfig, app, appConfig.prefix);
    const swaggerPath = `${appConfig.prefix}${swaggerConfig.swaggerPath}`;

    if (swaggerSetup) {
      logger.log(`Swagger is listening on ${swaggerPath}`);
    } else {
      logger.log(`Swagger is disabled by config, skipping...`);
    }
  } else {
    logger.debug(
      `SwaggerConfig instance is not provided so swagger turned off by default, skipping... Details: %o`,
      swaggerConfig,
    );
  }

  // 默认情况下，Fastify 仅侦听 localhost，因此我们应该指定“0.0.0.0”
  await app.listen(appConfig.port, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const { pid } = process;
    logger.log(`[${pid}] Master Server running on: ${url}`)
  });
};
// TODO: 如果 CLUSTERING 环境变量为 true，则启用集群模式
// if (CLUSTERING === 'true') clusterize(bootstrap);
// else bootstrap();
bootstrap();
