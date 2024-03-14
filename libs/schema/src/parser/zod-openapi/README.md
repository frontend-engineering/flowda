核心点

1. 仅需关注 openapi 3.0.0
2. 不关注 reusable [components](https://swagger.io/docs/specification/components/) 而且更希望直接生成 JSON schema
3. prisma 的 schema 自定义字段透传到 JSON schema，且不破坏 openapi spec
4. prisma 的一些特殊字段, e.g. `JsonValue` `DbNull` `DecimalJsLike`，看 trpc 认不认，不需要走直接转成 primary type，e.g. `record` `null` `number`
5. 如无必要，不要支持太复杂的 zod，e.g. recursive schema `ZodLazy`

不需要支持的高级 zod 特性
- ZodBranded 保持鸭子类型挺好
- ZodCatch 没有必要
- ZodLazy 递归结构，不用支持
- ZodEffects 太高级了，用多了不好理解
