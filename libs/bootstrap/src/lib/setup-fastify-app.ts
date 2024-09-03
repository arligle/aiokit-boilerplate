import { generateRandomId } from "@aiokit/crypto";
import fastifyHelmet from "@fastify/helmet";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyInstance, RawServerDefault } from "fastify";

/**
 * @description 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
 */
function applyExpressCompatibilityRecommendations(
  fastifyInstance: FastifyInstance,
) {
  // 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
  fastifyInstance
    .addHook('onRequest', async (req) => {
      req.socket['encrypted'] = process.env.NODE_ENV === 'production';
    })
    .decorateReply(
      'setHeader',
      /* istanbul ignore next */ function (name: string, value: unknown) {
        this.header(name, value);
      },
    )
    .decorateReply(
      'end',
      /* istanbul ignore next */ function () {
        this.send('');
      },
    );
}
/**
 * @description 用于创建并返回一个 FastifyAdapter 实例
 * 为 Fastify 服务器提供了一个定制化的适配器，
 * 确保每个请求都有唯一的 ID(将配合Nestjs CLS用于请求状态缓存管理)，并限制了请求体的大小。
 */
export function buildFastifyAdapter() {
  const REQUEST_ID_HEADER = 'x-request-id'; // 请求 ID 的 HTTP 头名称
  return new FastifyAdapter({
    // TODO: 生成请求 ID,这对于管理存储状态很重要，因为它允许我们跟踪请求的生命周期
    genReqId: (req: { headers: { [x: string]: any } }) => {
      const requestId = req.headers[REQUEST_ID_HEADER];
      return requestId || generateRandomId();
    },
    bodyLimit: 10_485_760,
  });
}

/**
 * @description 创建 Fastify 应用程序
 */
export async function createFastifyApp(module: any): Promise<NestFastifyApplication<RawServerDefault>> {
  const app = await NestFactory.create<NestFastifyApplication>(
    module,
    buildFastifyAdapter(),
    {}
  );
  // 这是 fastify 的建议，旨在提高与 Express 中间件的兼容性
  const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();
  applyExpressCompatibilityRecommendations(fastifyInstance);
  // 使用 fastify-helmet 中间件,会启用一组默认的增强HTTP头安全的配置
  app.register(fastifyHelmet, {});
  return app;
}

