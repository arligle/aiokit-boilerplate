import { setupSwagger, SwaggerConfig } from "@aiokit/swagger-utils";
import { callOrUndefinedIfException } from "./functions";
import { AppConfig } from "../config/app.config";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { RawServerDefault } from "fastify";
import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { HttpAdapterHost, Reflector } from "@nestjs/core";
import { AnyExceptionFilter, HttpExceptionFilter, OverrideDefaultForbiddenExceptionFilter, OverrideDefaultNotFoundFilter, responseBodyFormatter } from "@aiokit/exceptions";
import { I18nValidationExceptionFilter } from "@aiokit/i18n";
/**
 * @description 创建日志记录器
 */
export function loggerInstall(
  app: NestFastifyApplication<RawServerDefault>
) {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  return logger;
}

/**
 * @description 创建 Swagger 文档
 */
export function swaggerInstall(
  app: NestFastifyApplication<RawServerDefault>,
  appConfig: AppConfig,
  logger: Logger,
) {
  const swaggerConfig = callOrUndefinedIfException(() =>
    app.get(SwaggerConfig),
  );
  const swaggerSetup = setupSwagger(swaggerConfig, app, appConfig.prefix);
  const swaggerPath = `${appConfig.prefix}${swaggerConfig.swaggerPath}`;
  if (swaggerConfig instanceof SwaggerConfig) {
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
  return swaggerPath;
}

/**
 * @description 设置全局过滤器
 * @param app
 * @param httpAdapterHost 用于处理 HTTP 请求
 */
export function setupGlobalFilters(
  app: INestApplication,
  httpAdapterHost: HttpAdapterHost,
) {
  app.useGlobalFilters(
    new AnyExceptionFilter(httpAdapterHost),
    new OverrideDefaultNotFoundFilter(httpAdapterHost),
    new OverrideDefaultForbiddenExceptionFilter(httpAdapterHost),
    // todo generalize
    // new PostgresDbQueryFailedErrorFilter(httpAdapterHost),
    new HttpExceptionFilter(httpAdapterHost),
    new I18nValidationExceptionFilter({
      responseBodyFormatter,
      detailedErrors: true,
    }),
  );
}
/**
 * @description 设置全局拦截器
 */
export function setupGlobalInterceptors(app: INestApplication) {
  // 使用 ClassSerializerInterceptor 拦截器，将响应对象序列化为 JSON 对象
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(
      // 使用 Reflector 反射器，获取元数据
      app.get(Reflector)
    )
  );
  // 使用 LoggerErrorInterceptor 拦截器，记录错误日志
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
}
