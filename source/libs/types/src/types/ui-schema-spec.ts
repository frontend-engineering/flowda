import { z } from 'zod'
import { ColumnKeySchema, ReferenceKeySchema } from './ui-schema-object'

export const ColumnUISchema = ColumnKeySchema.omit({
  key_type: true,
}).extend({
  name: z.string(),
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.omit({ key_type: true }).optional(),
}).partial()
