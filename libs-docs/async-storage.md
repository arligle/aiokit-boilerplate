# 这是一个简单的包装器，用于为 NestJS 设置 Cls 异步存储


```
这很有用，只是为了不要每次都重复自己，并且不应该在 aiokit 生态系统之外使用
```
## NestJS CLS
你应该先了解[NestJS CLS](https://papooch.github.io/nestjs-cls/)，这是你使用此库的关键。
NestJS CLS当初的动机是为了解决一个特定的使用案例，该用例以集中方式限制仅访问与请求用户具有相同 TenantId 的记录。存储库代码自动向每个查询添加一个 WHERE 子句，这确保了其他开发人员不会意外地混合租户数据（所有租户的数据都保存在同一个数据库中），而无需额外的工作。

AsyncLocalStorage 仍然相当新，没有多少人知道它的存在和好处。
## continuation-local
"continuation-local" 是一种编程概念，主要用于处理异步编程中的上下文管理。它允许在不同的执行上下文中保持某些局部状态，而不受调用栈的影响。具体来说，它可以在异步操作之间传递数据，确保在回调或异步函数中能够访问到特定的上下文信息。

这种机制通常用于需要在异步操作中保持状态的场景，例如在 web 开发中处理请求的上下文信息。通过使用 continuation-local 存储，可以避免在复杂的异步调用中丢失重要的上下文数据。

Continuation-local storage（可持续的本地存储） 允许存储状态并将其传播到整个回调和承诺链中。它允许在 Web 请求的整个生命周期或任何其他异步持续时间内存储数据。它类似于其他语言中的线程本地存储。
## Installation

```bash
yarn add @aiokit/async-storage
```

## Usage


```typescript

import { setupClsModule } from '@aiokit/async-storage';

@Module({
  imports: [
    setupClsModule(),
  ]
})
export class MainAppAppModule {}


```
