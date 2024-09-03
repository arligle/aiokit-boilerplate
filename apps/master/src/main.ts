import { HttpAdapterHost } from "@nestjs/core";
import {
  AppConfig,
  setupGlobalFilters,
  setupGlobalInterceptors,
  swaggerInstall,
  loggerInstall,
  createFastifyApp,
} from '@aiokit/bootstrap';
// import { clusterize } from '@aiokit/utils';


import { I18nValidationPipe } from '@aiokit/i18n';
import { DEFAULT_VALIDATION_OPTIONS } from '@aiokit/validation';
import { SysModule } from "./sys.module";
import { initializeTransactionalContext } from "typeorm-transactional";
// const { CLUSTERING } = process.env;
const bootstrap = async () => {
  // 初始化事务上下文存储驱动。需要在应用程序启动之前调用这个方法
  initializeTransactionalContext();

  const app = await createFastifyApp(SysModule);
  // 创建日志记录器
  const logger = loggerInstall(app);
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

  // 设置跨域配置
  app.enableCors(new AppConfig().cors);
  // 为了在应用程序关闭时优雅地关闭所有连接，我们需要启用关闭挂钩
  app.enableShutdownHooks();
  /**
   * @description 获取当前 FastifyAdapter 实例
   * 这在需要直接访问或操作底层HTTP服务器时非常有用，
   * 例如设置全局中间件、处理自定义请求或响应等。
   */
  const httpAdapterHost = app.get(HttpAdapterHost);
  // 设置全局验证管道,自定义的I18nValidationPipe支持国际化多语言验证逻辑处理
  app.useGlobalPipes(new I18nValidationPipe(DEFAULT_VALIDATION_OPTIONS));

  // // so first global one and then narrow
  setupGlobalFilters(app, httpAdapterHost);
  setupGlobalInterceptors(app);

  const appConfig = app.get(AppConfig);
  // swagger 配置
  const swaggerPath = swaggerInstall(app, appConfig, logger);

  // 默认情况下，Fastify 仅侦听 localhost，因此我们应该指定“0.0.0.0”
  await app.listen(appConfig.port, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const { pid } = process;
    logger.log(`[${pid}] Master Server running on: ${url}`);
    logger.log(`[${pid}] Swagger API Docs running on: ${url}/${swaggerPath}`);
  });
};
// TODO: 如果 CLUSTERING 环境变量为 true，则启用集群模式
// if (CLUSTERING === 'true') clusterize(bootstrap);
// else bootstrap();
bootstrap();
