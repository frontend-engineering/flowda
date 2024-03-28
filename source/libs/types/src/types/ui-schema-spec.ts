import { z } from 'zod'
import { ColumnKeySchema, ReferenceKeySchema, ResourceKeySchema } from './ui-schema-object'

export const ResourceUISchema = ResourceKeySchema.omit({
  properties: true,
  required: true,
})

export const ColumnUISchema = ColumnKeySchema.extend({
  name: z.string(),
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.optional(),
})

export const PluginKeySchema = z.custom<Record<`x-${string}`, unknown>>()
  .transform<Record<`x-${string}`, unknown>>((val, ctx) => {
    return Object.fromEntries(Object.entries(val).filter(([k, v]) => {
      return k.startsWith('x-')
    }))
  })
export type PluginKey = z.infer<typeof PluginKeySchema>
//          ^?

export type ColumUI = z.infer<typeof ColumnUISchema> & PluginKey
