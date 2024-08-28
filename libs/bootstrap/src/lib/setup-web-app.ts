import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";


export async function bootstrapBaseWebApp(module: any){
const app = await NestFactory.create(module);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  return app;
}
