import { z } from 'zod'
import { ColumnKeySchema, ReferenceKeySchema, ResourceKeySchema } from './ui-schema-object'

export const ResourceUISchema = ResourceKeySchema.omit({
  key_type: true,
  properties: true,
  required: true,
})

export const ColumnUISchema = ColumnKeySchema.omit({
  key_type: true,
  type: true,
}).extend({
  name: z.string(),
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.omit({ key_type: true }).optional(),
}).partial()
