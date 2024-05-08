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
}).extend({
  namespace: z.string().describe('网关作为命名空间'),
  columns: z.array(ColumnUISchema),
  associations: z.array(AssociationKeySchema),
})

export type ResourceUI = z.infer<typeof ResourceUISchema>

export type ColumUI = z.infer<typeof ColumnUISchema>
