核心点

1. 仅需关注 openapi 3.0.0
2. 不关注 reusable [components](https://swagger.io/docs/specification/components/) 而且更希望直接生成 JSON schema
3. prisma 的 schema 自定义字段透传到 JSON schema，且不破坏 openapi spec
4. prisma 的一些特殊字段, e.g. `JsonValue` `DbNull` `DecimalJsLike`，看 trpc 认不认，不需要走直接转成 primary type，e.g. `record` `null` `number`
