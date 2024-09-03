# Bootstrap Library

该库提供了一组用于引导应用程序的通用服务、方法和实用程序。
它正在配置默认拦截器、swagger、http 服务器、安全性等......

---

有助于避免每次重复，并且不应在 Softkit 生态系统之外使用

---

## Installation

```bash
yarn add @aiokit/bootstrap
```

## Usage in your main.ts

```typescript
import { PlatformAppModule } from './your-app.module';
import { bootstrapBaseWebApp } from '@aiokit/bootstrap';

void bootstrapBaseWebApp(PlatformAppModule);
```

---

## Usage in tests (e2e)

```typescript
import { bootstrapBaseWebApp } from '@aiokit/bootstrap';

describe('auth e2e test', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [YourAppModule],
    }).compile();
    app = await bootstrapBaseWebApp(moduleFixture, PlatformAppModule);
  });
});
```
