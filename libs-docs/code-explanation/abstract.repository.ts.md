libs/persistence-api/src/lib/repository/abstract.repository.ts

这是一个抽象类，这个类的职责是把操作的对象和该做什么操作这两件事情说清楚，具体怎么操作它不管

假如，我们的ENTITY是这样的

```
+   id: string  // 自动生成
+   tenantFriendlyIdentifier: string
+   tenantName: string
+   tenantStatus: TenantStatus
+   ownerId: string
+   owner?: UserProfile
+   samlConfigurations?: SAMLConfiguration[]
+   tenantUsersAccount?: UserTenantAccount[]
+   version: number  // 自动生成
```



## 首先，说清楚操作的对象，就是这个ENTITY必须符合什么样的条件说清楚

### 构建这个repository的时候，必须传入这么几个参数

### 这个repository有能力进行以下的操作

### 在进行upsert操作时，repository需要传入一个ENTITY，而且，这个ENTITY必须是这样的：

```typescript
  abstract upsert(
    entity:
      | (Omit<ENTITY, AUTO_GENERATED_FIELDS | FIELDS_REQUIRED_FOR_UPDATE> &
        Partial<Never<Pick<ENTITY, FIELDS_REQUIRED_FOR_UPDATE>>>)
      | (Omit<ENTITY, AUTO_GENERATED_FIELDS | FIELDS_REQUIRED_FOR_UPDATE> &
        Pick<ENTITY, FIELDS_REQUIRED_FOR_UPDATE>),
  ): Promise<ENTITY>;
```

Omit<ENTITY, AUTO_GENERATED_FIELDS | FIELDS_REQUIRED_FOR_UPDATE>

首先，从ENTITY这个实体中剔除自动生成的字段和需要查找更新的字段，就是说，这个ENTITY不能有自动生成的字段，和用来查找或更新的字段

Partial<Never<Pick<ENTITY, FIELDS_REQUIRED_FOR_UPDATE>>>

然后，把哪些需要查找或更新的字段全部转换为Nerver类型，并且变成是可选的