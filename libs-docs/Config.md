# Config Library

This library provides a set of general services and utilities for configuration.
It can be used outside Softkit projects


This library is based on [nestjs-config](https://github.com/Nikaple/nest-typed-config)
All main work is done in parent library, this one is just a wrapper to make it easier to use

---

## Installation

```bash
yarn add @aiokit/config
```

---

## Usage

```typescript
import { setupYamlBaseConfigModule } from '@aiokit/config';


@Module({
  imports: [
    setupYamlBaseConfigModule(path.join(__dirname, './assets'), RootConfig),
  ]
})
export class YourAppModule {}


```

---

`./assets` - is a folder where you have your config files. Above example is for such code structure:


```bash                                                                        git(docs/readme_for_each_module↑1|✚1…1
.
├── assets
│     ├── .env-test.yaml
│     └── .env.yaml
├── config
│     └── root.config.ts
└── your-app.module.ts
```

---


## This wrapper has a few additions:

- It has *PROFILES* feature, so you can have different configs for different environments.
  - NESTJS_PROFILES -是一个环境变量，用于定义要使用的配置文件
  - 默认情况下，它没有配置文件，仅使用主要提供的文件名
  - 配置文件的顺序很重要，它定义了如何合并配置，以防出现任何冲突
  - Example:
    - `NESTJS_PROFILES=dev,local` -将使用 `.env-dev.yaml` 和 `.env-local.yaml` 文件以及基础 `.env.yaml`
    - `NESTJS_PROFILES=dev` -将仅使用 `.env-dev.yaml` 文件和基础 `.env.yaml`
  - 默认情况下，我们建议在 jest config 中设置测试配置文件。在 jest.preset.js 中
  ```javascript
     process.env.NESTJS_PROFILES = 'test';
  ```
- 另一个调整是为 RootConfig 类添加通用别名，这样我们就可以以相同的方式在各种应用程序中重用它。
  - 要在另一个库中注入配置，您只需要使用通用令牌“ROOT_CONFIG_ALIAS_TOKEN”
  - 我们利用 NestJS DI 使用现有功能以通用方式提供配置
      ```typescript
      {
        provide: ROOT_CONFIG_ALIAS_TOKEN,
        useExisting: rootSchemaClass,
      }
      ```
  - 在您的库中，您可以期望此提供程序在全局范围内可用，并且您可以强制此配置来实现您的接口。因此，您将能够很好地解耦应用程序，并声明性定义您需要在库中使用的配置。
    - Example in your library:
      ```typescript
      import { Inject, Injectable } from '@nestjs/common';
      import { ROOT_CONFIG_ALIAS_TOKEN, RootConfig } from '@aiokit/config';
      import { YourConfigInterface } from './your-config.interface';

      @Injectable()
      export class YourService {
        constructor(
          @Inject(ROOT_CONFIG_ALIAS_TOKEN)
          private readonly config: YourConfigInterface,
        ) {}

        getYourConfig(): YourConfigInterface {
          return this.config.yourConfig;
        }
      }
      ```


## Example config file structure

```yaml
# .env.yaml
isAuthEnabled: ${AUTH_ENABLED:-true}
database:
  host: ${DATABASE_HOST:-127.0.0.1}
  port: ${DATABASE_PORT:-3000}
  table:
    name: ${TABLE_NAME:-users}

databaseAlias:
  host: ${database.host}
  port: ${database.port}
  table:
    name: ${database.table.name}
```

`As you can see you can leverage ENV variables in your config files, or use a value to reference another value from your config file`

Your .env.yaml file is usually huge and contains a lot of configs, so it's not very convenient to use it in your code.
Where the profile files, just overriding some specific things for needed environment

Let's say that for tests we always will be connecting to port `12345`.

You just need to create this file and it will be used for tests, when you set env var `NESTJS_PROFILES=test`:

```yaml
# .env-test.yaml
database:
  port: 12345
```
