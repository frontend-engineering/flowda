import { z } from 'zod'
import { AssociationKeySchema, ColumnKeySchema, ReferenceKeySchema, ResourceKeySchema } from './ui-schema-object'

export const ColumnUISchema = ColumnKeySchema.extend({
  name: z.string(),
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.optional(),
})

export const ResourceUISchema = ResourceKeySchema.omit({
  properties: true,
  required: true,
})
  .extend({
    namespace: z.string().describe('网关作为命名空间'),
    columns: z.array(ColumnUISchema),
    associations: z.array(AssociationKeySchema),
  })


// todo: 去掉这种写法 zod 还不够强大，处理 template literal
export const PluginKeySchema = z.custom<Record<`x-${string}`, unknown>>()
  .transform<Record<`x-${string}`, unknown>>((val, ctx) => {
    return Object.fromEntries(Object.entries(val).filter(([k, v]) => {
      return k.startsWith('x-')
    }))
  })
export type PluginKey = z.infer<typeof PluginKeySchema>
//          ^?

export type ColumUI = z.infer<typeof ColumnUISchema> & PluginKey
