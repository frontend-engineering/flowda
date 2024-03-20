import { z } from 'zod'
import { AssociationKey, ColumnKey, ReferenceKey, ResourceKey } from '@anatine/zod-openapi'

export const ResourceKeySchema = z.object({
  class_name: z.string(),
  display_column: z.string(),
  display_name: z.string(),
  display_primary_key: z.boolean(),
  name: z.string(),
  primary_key: z.string(),
  searchable_columns: z.array(z.string()).nullable(),
  slug: z.string(),
  table_name: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<ResourceKey>

export const ColumnKeySchema = z.object({
  // access_type: z.string(),
  column_source: z.string(),
  column_type: z.string(),
  display_name: z.string(),
  name: z.string(),
}) satisfies z.ZodType<ColumnKey>

export const AssociationKeySchema = z.object({
  name: z.string(),
  display_name: z.string(),
  slug: z.string(),
  model_name: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<AssociationKey>

export const ReferenceKeySchema = z.object({
  name: z.string(),
  display_name: z.string(),
  model_name: z.string(),
  reference_type: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
}) satisfies z.ZodType<ReferenceKey>

export const ColumnUISchema = ColumnKeySchema.extend({
  validators: z.array(z.unknown()),
  reference: ReferenceKeySchema.optional(),
})
