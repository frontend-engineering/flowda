import { z } from 'zod'

export type ResourceKey = {
  key_type: 'resource'
  class_name: string
  display_column: string
  display_name: string
  display_primary_key: string
  name: string
  primary_key: string | null
  searchable_columns: string | null
  slug: string
  table_name: string
  visible: boolean
}
export const ResourceKeySchema = z.object({
  key_type: z.literal('resource'),
  class_name: z.string(),
  display_column: z.string(),
  display_name: z.string(),
  display_primary_key: z.string(),
  name: z.string(),
  primary_key: z.string().nullable(),
  searchable_columns: z.string().nullable(),
  slug: z.string(),
  table_name: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<ResourceKey>

export type ColumnKey = {
  key_type: 'column'
  column_type: string
  display_name: string
}

export const ColumnKeySchema = z.object({
  key_type: z.literal('column'),
  column_type: z.string(),
  display_name: z.string(),
}) satisfies z.ZodType<ColumnKey>

export type AssociationKey = {
  key_type: 'association'
  display_name: string
  slug: string
  model_name: string
  foreign_key: string
  primary_key: string
  visible: boolean
}
export const AssociationKeySchema = z.object({
  key_type: z.literal('association'),
  display_name: z.string(),
  slug: z.string(),
  model_name: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<AssociationKey>

export type ReferenceKey = {
  key_type: 'reference'
  display_name: string
  model_name: string
  reference_type: 'belongs_to' | 'has_one'
  foreign_key: string
  primary_key: string
}
export const ReferenceKeySchema = z.object({
  key_type: z.literal('reference'),
  display_name: z.string(),
  model_name: z.string(),
  reference_type: z.union([z.literal('belongs_to'), z.literal('has_one')]),
  foreign_key: z.string(),
  primary_key: z.string(),
}) satisfies z.ZodType<ReferenceKey>

export type UISchemaObject =
  | ResourceKey
  | ColumnKey
  | AssociationKey
  | ReferenceKey
