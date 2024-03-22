import { z } from 'zod'
import { ColumnKeySchema, ReferenceKeySchema } from './extended-schema-object'

export const ColumnUISchema = ColumnKeySchema.omit({
  key_type: true,
}).extend({
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.omit({ key_type: true }).optional(),
})
