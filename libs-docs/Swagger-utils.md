# Swagger Utils Library

这是 Nestjs-swagger 库之上的包装器，它提供了在应用程序中使用的自动配置和配置类。

它在 @aiokit/bootstrap 库中明确使用，但您也可以在应用程序中使用它。


Features:

- 它为 swagger 提供了默认配置
- 它将向您的 asset 文件夹写入一个 open-api.json 文件，该文件将用于生成器，为您的应用程序创建 HTTP 客户端。 （*这通常应该在上层环境中禁用，并且仅在本地使用*）。要禁用它，只需从除 dev 之外的所有配置文件中的配置中删除“docsOutputPath”即可。

## Installation

```bash
yarn add @aiokit/swagger-utils
```

## Usage

### Default configuration in your main.ts

```typescript
const swaggerSetup = setupSwagger(swaggerConfig, app);
```

### Ensuring Correct Swagger Path Configuration
The `setupSwagger` function facilitates the accurate configuration of the swagger path, accommodating optional API route prefixes. When an `appPrefix` is provided, the function concatenates it with the swagger path, ensuring the Swagger UI reflects your API's prefixed route structure.

Without an `appPrefix`, the Swagger UI defaults to the standard swagger path.

Example usage with an API prefix 'api/app':

```typescript
const appPrefix = 'api/app';
const swaggerSetup = setupSwagger(swaggerConfig, app, appPrefix);
```

### Default configuration in your root config class

```typescript
import { SwaggerConfig } from '@aiokit/swagger-utils';

export class RootConfig {
  @Type(() => SwaggerConfig)
  @ValidateNested()
  public readonly swagger!: SwaggerConfig;
}
```

### .env.yaml file

```yaml
swagger:
  title: 'some useful name'
  swaggerPath: /swagger
  enabled: true
  description: 'some useful description'
  version: 1.0.0
  contactName: 'John Doe'
  contactEmail: 'john.doe@aiokit.dev'
  contactUrl: https://www.softkit.dev/
  servers:
    - { url: 'http://localhost:9999', description: 'local server' }
```
