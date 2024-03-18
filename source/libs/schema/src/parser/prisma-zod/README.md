考虑到实现复杂度，使用 submodules + modify + yalc 方式协作

- 继续使用 [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types)，核心诉求
  - 解析 rich comments
  - 尽量通过 AST 解析并生成到 openapi，临时方案可以显式声明在 rich comments
  - 如果后续强类型，主要是 input 参考 [prisma-trpc-generator](https://github.com/omar-dulaimi/prisma-trpc-generator)

options

目前先生成 `createModelTypes`，其他先 `false`

- createRelationValuesTypes (*)`zod.number().int()` vs `zod.number()`
- writeNullishInModelTypes `zod.nullable()` vs (*)`zod.nullish()`

```prisma
generator zod {
  output                    = "./generated/zod" // default is ./generated/zod
  useMultipleFiles          = true // default is false 建议打开，方便 diff
  createInputTypes          = false // default is true
  // createModelTypes                 = false // default is true
  addInputTypeValidation    = false // default is true
  addIncludeType            = false // default is true
  addSelectType             = false // default is true
  // validateWhereUniqueInput         = true // default is false
  // createOptionalDefaultValuesTypes = true // default is false
  createRelationValuesTypes = true // default is false
  // createPartialTypes               = true // default is false
//  useDefaultValidators      = false // default is true
  coerceDate                = false // default is true
  writeNullishInModelTypes  = true // default is false
  // prismaClientPath                 = "./generated/client" // optional
}

```
