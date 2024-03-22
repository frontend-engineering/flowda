import { z } from 'zod'
import { AssociationKey, ColumnKey, ReferenceKey, ResourceKey } from './extended-schema-object'

export const ResourceKeySchema = z.object({
  key_type: z.literal('resource'),
  class_name: z.string(),
  display_column: z.string(),
  display_name: z.string(),
  display_primary_key: z.boolean(),
  name: z.string(),
  primary_key: z.string().nullable(),
  searchable_columns: z.array(z.string()).nullable(),
  slug: z.string(),
  table_name: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<ResourceKey>

export const ColumnKeySchema = z.object({
  key_type: z.literal('column'),
  // access_type: z.string(),
  column_source: z.string(),
  column_type: z.string(),
  display_name: z.string(),
  name: z.string(),
}) satisfies z.ZodType<ColumnKey>

export const AssociationKeySchema = z.object({
  key_type: z.literal('association'),
  name: z.string(),
  display_name: z.string(),
  slug: z.string(),
  model_name: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<AssociationKey>

export const ReferenceKeySchema = z.object({
  key_type: z.literal('reference'),
  name: z.string(),
  display_name: z.string(),
  model_name: z.string(),
  reference_type: z.union([z.literal('belongs_to'), z.literal('has_one')]),
  foreign_key: z.string(),
  primary_key: z.string(),
}) satisfies z.ZodType<ReferenceKey>

export const ColumnUISchema = ColumnKeySchema.omit({
  key_type: true,
}).extend({
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.omit({ key_type: true }).optional(),
})
